import {
  Cell,
  GetTransactionChanges,
  Store,
  Tables,
  Values,
} from './types/store.d';
import {Persister, PersisterListener} from './types/persisters.d';
import {Array as YArray, Doc as YDoc, YEvent, Map as YMap} from 'yjs';
import {arrayForEach, arrayIsEmpty, arrayShift} from './common/array';
import {ifNotUndefined, isUndefined} from './common/other';
import {objEnsure, objHas, objMap, objNew} from './common/obj';
import {Id} from './types/common.d';
import {IdObj} from './common/obj';
import {TransactionChanges} from './types/store.d';
import {createCustomPersister} from './persisters';
import {mapForEach} from './common/map';

type Observer = (events: YEvent<any>[]) => void;

const DELETE = 'delete';

const getTransactionChangesFromYDoc = (
  yContent: YArray<any>,
  events: YEvent<any>[],
): TransactionChanges => {
  const tables = {} as any;
  const values = {} as any;
  const [yTables, yValues] = yContent.toArray();
  arrayForEach(events, ({path, changes: {keys}}) =>
    arrayShift(path) == 0
      ? ifNotUndefined(
          arrayShift(path) as string,
          (yTableId) => {
            const table = objEnsure(tables, yTableId, objNew) as any;
            const yTable = yTables.get(yTableId) as YMap<YMap<Cell>>;
            ifNotUndefined(
              arrayShift(path) as string,
              (yRowId) => {
                const row = objEnsure(table, yRowId, objNew) as any;
                const yRow = yTable.get(yRowId) as YMap<Cell>;
                mapForEach(
                  keys,
                  (cellId, {action}) =>
                    (row[cellId] = action == DELETE ? null : yRow.get(cellId)),
                );
              },
              () =>
                mapForEach(
                  keys,
                  (rowId, {action}) =>
                    (table[rowId] =
                      action == DELETE ? null : yTable.get(rowId)?.toJSON()),
                ),
            );
          },
          () =>
            mapForEach(
              keys,
              (tableId, {action}) =>
                (tables[tableId] =
                  action == DELETE ? null : yTables.get(tableId)?.toJSON()),
            ),
        )
      : mapForEach(
          keys,
          (valueId, {action}) =>
            (values[valueId] = action == DELETE ? null : yValues.get(valueId)),
        ),
  );
  return [tables, values];
};

const setTransactionChangesToYDoc = (
  yContent: YArray<any>,
  getContent: () => [Tables, Values],
  getTransactionChanges?: GetTransactionChanges,
) => {
  if (!yContent.length) {
    yContent.push([new YMap(), new YMap()]);
  }
  const [yTables, yValues] = yContent.toArray();
  const transactionChangesDidFail = () => {
    transactionChangesFailed = 1;
  };
  let transactionChangesFailed = 1;
  ifNotUndefined(getTransactionChanges?.(), ([cellChanges, valueChanges]) => {
    transactionChangesFailed = 0;
    objMap(cellChanges, (table, tableId) =>
      transactionChangesFailed
        ? 0
        : isUndefined(table)
        ? yTables.delete(tableId)
        : ifNotUndefined(
            yTables.get(tableId),
            (yTable) =>
              objMap(table, (row, rowId) =>
                transactionChangesFailed
                  ? 0
                  : isUndefined(row)
                  ? yTable.delete(rowId)
                  : ifNotUndefined(
                      yTable.get(rowId),
                      (yRow) =>
                        objMap(row, (cell, cellId) =>
                          isUndefined(cell)
                            ? yRow.delete(cellId)
                            : yRow.set(cellId, cell),
                        ),
                      transactionChangesDidFail,
                    ),
              ),
            transactionChangesDidFail,
          ),
    );
    objMap(valueChanges, (value, valueId) =>
      transactionChangesFailed
        ? 0
        : isUndefined(value)
        ? yValues.delete(valueId)
        : yValues.set(valueId, value),
    );
  });
  if (transactionChangesFailed) {
    const [tables, values] = getContent();
    yMapMatch(yTables, undefined, tables, (_, tableId, table) =>
      yMapMatch(yTables, tableId, table, (yTable, rowId, row) =>
        yMapMatch(yTable, rowId, row, (yRow, cellId, cell) => {
          if (yRow.get(cellId) !== cell) {
            yRow.set(cellId, cell);
            return 1;
          }
        }),
      ),
    );
    yMapMatch(yValues, undefined, values, (_, valueId, value) => {
      if (yValues.get(valueId) !== value) {
        yValues.set(valueId, value);
      }
    });
  }
};

const yMapMatch = (
  yMapOrParent: YMap<any>,
  idInParent: Id | undefined,
  obj: IdObj<any>,
  set: (yMap: YMap<any>, id: Id, value: any) => 1 | void,
): 1 | void => {
  const yMap = isUndefined(idInParent)
    ? yMapOrParent
    : yMapOrParent.get(idInParent) ?? yMapOrParent.set(idInParent, new YMap());
  let changed: 1 | undefined;
  objMap(obj, (value, id) => {
    if (set(yMap, id, value)) {
      changed = 1;
    }
  });
  yMap.forEach((_: any, id: Id) => {
    if (!objHas(obj, id)) {
      yMap.delete(id);
      changed = 1;
    }
  });
  if (!isUndefined(idInParent) && !yMap.size) {
    yMapOrParent.delete(idInParent);
  }
  return changed;
};

export const createYjsPersister = (
  store: Store,
  yDoc: YDoc,
  yArrayName = 'tinybase',
): Persister => {
  const yContent: YArray<any> = yDoc.getArray(yArrayName);

  const getPersisted = async (): Promise<[Tables, Values] | undefined> => {
    const content = yContent.toJSON();
    if (!arrayIsEmpty(content)) {
      return content as [Tables, Values];
    }
  };

  const setPersisted = async (
    getContent: () => [Tables, Values],
    getTransactionChanges?: GetTransactionChanges,
  ): Promise<void> => {
    if (!yContent.length) {
      yContent.push([new YMap(), new YMap()]);
    }
    yDoc.transact(() =>
      setTransactionChangesToYDoc(yContent, getContent, getTransactionChanges),
    );
  };

  const addPersisterListener = (listener: PersisterListener): Observer => {
    const observer: Observer = (events) =>
      listener(undefined, () =>
        getTransactionChangesFromYDoc(yContent, events),
      );
    yContent.observeDeep(observer);
    return observer;
  };

  const delPersisterListener = (observer: Observer): void => {
    yContent.unobserveDeep(observer);
  };

  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
  );
};
