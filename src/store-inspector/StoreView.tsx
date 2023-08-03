/** @jsx createElement */

import {DEFAULT, TABLE, VALUES} from '../common/strings';
import {SORT_CELL, STATE_TABLE, getUniqueId} from './common';
import {SortedTableInHtmlTable, ValuesInHtmlTable} from '../ui-react/dom';
import {TableProps, ValuesProps} from '../types/ui-react';
import {arrayIsEmpty, arrayMap} from '../common/array';
import {jsonParse, jsonString} from '../common/json';
import {
  useCell,
  useSetCellCallback,
  useStore,
  useTableIds,
  useValueIds,
} from '../ui-react';
import {Details} from './Details';
import {Id} from '../types/common';
import {StoreProp} from './types';
import {createElement} from '../ui-react/common';
import {isUndefined} from '../common/other';

const StoreTableView = ({
  tableId,
  store,
  storeId,
  s,
}: TableProps & {readonly storeId?: Id} & StoreProp) => {
  const uniqueId = getUniqueId('t', storeId, tableId);
  const [cellId, descending, offset] = jsonParse(
    (useCell(STATE_TABLE, uniqueId, SORT_CELL, s) as string) ?? '[]',
  );
  const handleChange = useSetCellCallback(
    STATE_TABLE,
    uniqueId,
    SORT_CELL,
    jsonString,
    [],
    s,
  );
  return (
    <Details uniqueId={uniqueId} summary={TABLE + ': ' + tableId} s={s}>
      <SortedTableInHtmlTable
        tableId={tableId}
        store={store}
        cellId={cellId}
        descending={descending}
        offset={offset}
        limit={10}
        paginator={true}
        sortOnClick={true}
        onChange={handleChange}
      />
    </Details>
  );
};

const StoreValuesView = ({
  store,
  storeId,
  s,
}: ValuesProps & {readonly storeId?: Id} & StoreProp) =>
  arrayIsEmpty(useValueIds(store)) ? null : (
    <Details uniqueId={getUniqueId('v', storeId)} summary={VALUES} s={s}>
      <ValuesInHtmlTable store={store} />
    </Details>
  );

export const StoreView = ({
  storeId,
  s,
}: {readonly storeId?: Id} & StoreProp) => {
  const store = useStore(storeId);
  const tableIds = useTableIds(store);
  return isUndefined(store) ? null : (
    <Details
      uniqueId={getUniqueId('s', storeId)}
      summary={'Store: ' + (storeId ?? DEFAULT)}
      s={s}
    >
      <StoreValuesView storeId={storeId} store={store} s={s} />
      {arrayMap(tableIds, (tableId) => (
        <StoreTableView
          storeId={storeId}
          tableId={tableId}
          store={store}
          s={s}
        />
      ))}
    </Details>
  );
};