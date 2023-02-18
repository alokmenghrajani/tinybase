import {
  CALLBACK,
  EXPORT,
  ID,
  SQUARE_BRACKETS,
  THE_STORE,
  getCellContentDoc,
  getIdsDoc,
  getRowContentDoc,
  getRowDoc,
  getTableContentDoc,
  getTableDoc,
  getTheContentOfTheStoreDoc,
  getValueContentDoc,
} from '../common/strings';
import {
  CELL,
  CELL_IDS,
  EMPTY_STRING,
  IDS,
  ROW,
  ROW_IDS,
  SORTED_ROW_IDS,
  TABLE,
  TABLES,
  TABLE_IDS,
  VALUE,
  VALUES,
  VALUE_IDS,
} from '../../common/strings';
import {IdMap, mapGet, mapMap, mapNew} from '../../common/map';
import {
  LINE,
  LINE_OR_LINE_TREE,
  LINE_TREE,
  camel,
  comment,
  getCodeFunctions,
  mapUnique,
} from '../common/code';
import {SharedTableTypes, SharedValueTypes, TableTypes} from './core';
import {TablesSchema, ValuesSchema} from '../../store.d';
import {arrayPush, arrayUnshift} from '../../common/array';
import {isArray, isUndefined} from '../../common/other';
import {Id} from '../../common.d';
import {OR_UNDEFINED} from '../common/strings';
import {getSchemaFunctions} from '../common/schema';
import {objIsEmpty} from '../../common/obj';

const COMMON_IMPORTS = [ID, IDS];

const USE_CONTEXT = 'const contextValue = useContext(Context);';
const AND_REGISTERS =
  ', and registers a listener so that any changes to ' +
  'that result will cause a re-render';
const BASED_ON_A_PARAMETER = ', based on a parameter';
const PARAMETERIZED_CALLBACK = 'ParameterizedCallback<Parameter>';

export const getStoreUiReactApi = (
  tablesSchema: TablesSchema,
  valuesSchema: ValuesSchema,
  module: string,
  sharedTableTypes: SharedTableTypes | [],
  sharedValueTypes: SharedValueTypes | [],
): [string, string] => {
  const [
    build,
    addImport,
    addType,
    addInternalFunction,
    addConstant,
    getImports,
    getTypes,
    getConstants,
  ] = getCodeFunctions();

  const [mapTablesSchema, mapCellSchema, mapValuesSchema] = getSchemaFunctions(
    tablesSchema,
    valuesSchema,
    addConstant,
  );

  const moduleDefinition = `./${camel(module)}.d`;
  const uiReactModuleDefinition = `./${camel(module)}-ui-react.d`;
  const storeType = camel(module, 1);
  const storeInstance = camel(storeType);
  const StoreOrStoreId = storeType + 'Or' + storeType + ID;
  const storeOrStoreId = storeInstance + 'Or' + storeType + ID;

  const functions: IdMap<
    [
      parameters: LINE,
      returnType: string | 1,
      body: LINE,
      doc: string,
      generic: string,
    ]
  > = mapNew();

  const addFunction = (
    name: Id,
    parameters: LINE,
    returnType: string | 1,
    body: LINE_OR_LINE_TREE,
    doc: string,
    generic = EMPTY_STRING,
  ): Id => {
    addImport(1, uiReactModuleDefinition, name + ' as ' + name + 'Decl');
    return mapUnique(functions, name, [
      parameters,
      returnType,
      isArray(body) ? ['{', body, '}'] : body,
      doc,
      generic,
    ]);
  };

  const addHook = (
    name: string,
    parameters: LINE,
    returnType: string,
    body: LINE_OR_LINE_TREE,
    doc: string,
    generic = EMPTY_STRING,
  ) => addFunction(`use${name}`, parameters, returnType, body, doc, generic);

  const addProxyHook = (
    name: string,
    underlyingName: string,
    returnType: string,
    doc: string,
    preParameters = EMPTY_STRING,
    preParametersInCall = EMPTY_STRING,
    generic = EMPTY_STRING,
    postParameters = EMPTY_STRING,
    postParametersInCall = EMPTY_STRING,
  ) => {
    addImport(
      1,
      'tinybase/ui-react',
      `use${underlyingName} as use${underlyingName}Core`,
    );
    addHook(
      name,
      (preParameters ? preParameters + ', ' : EMPTY_STRING) +
        storeOrStoreIdParameter +
        (postParameters ? ', ' + postParameters : EMPTY_STRING),
      returnType,
      useHook +
        `(${storeOrStoreId}, use${underlyingName}Core, [` +
        (preParametersInCall ? preParametersInCall : EMPTY_STRING) +
        (postParametersInCall ? '], [' + postParametersInCall : EMPTY_STRING) +
        '])',
      doc,
      generic,
    );
  };

  const addComponent = (
    name: Id,
    parameters: LINE,
    body: LINE_OR_LINE_TREE,
    doc: string,
  ) => addFunction(name, parameters, 1, body, doc);

  const getFunctions = (location: 0 | 1 = 0): LINE_TREE =>
    mapMap(functions, ([parameters, returnType, body, doc, generic], name) => {
      const lines = location
        ? [
            EXPORT +
              ` const ${name}: typeof ${name}Decl = ${generic}` +
              `(${parameters}): ${returnType == 1 ? 'any' : returnType} =>`,
            body,
          ]
        : [
            EXPORT +
              ` function ${name}${generic}(${parameters}` +
              `): ${returnType == 1 ? 'ComponentReturnType' : returnType};`,
          ];
      if (!location) {
        arrayUnshift(lines, comment(doc));
      }
      arrayPush(lines, EMPTY_STRING);
      return lines;
    });

  addImport(0, 'tinybase', ...COMMON_IMPORTS);
  addImport(0, 'tinybase/ui-react', 'ComponentReturnType');
  addImport(0, moduleDefinition, storeType);

  const storeOrStoreIdType = addType(
    StoreOrStoreId,
    storeType + ' | Id',
    `Used when you need to refer to a ${storeType} in a React hook or ` +
      'component',
  );

  const providerPropsType = addType(
    'ProviderProps',
    `{readonly ${storeInstance}?: ${storeType}; ` +
      `readonly ${storeInstance}ById?: ` +
      `{[${storeInstance}Id: Id]: ${storeType}}}`,
    'Used with the Provider component, so that ' +
      `a ${storeType} can be passed into the context of an application`,
  );

  addImport(1, 'react', 'React');
  addImport(1, 'tinybase', ...COMMON_IMPORTS);
  addImport(1, uiReactModuleDefinition, storeOrStoreIdType, providerPropsType);

  const storeOrStoreIdParameter = storeOrStoreId + '?: ' + storeOrStoreIdType;

  addConstant('{createContext, useContext, useMemo}', 'React');

  addConstant(
    'Context',
    `createContext<[${storeType}?, ` +
      `{[${storeInstance}Id: Id]: ${storeType}}?]>([])`,
  );

  addHook(
    `Create${storeType}`,
    `create: () => ${storeType}, createDeps?: React.DependencyList`,
    storeType,
    '\n// eslint-disable-next-line react-hooks/exhaustive-deps\n' +
      'useMemo(create, createDeps)',
    `Create a ${storeType} within a React application with convenient ` +
      'memoization',
  );

  const getStoreHook = addHook(
    storeType,
    `id?: Id`,
    storeType + OR_UNDEFINED,
    [
      USE_CONTEXT,
      'return id == null ? contextValue[0] : contextValue[1]?.[id];',
    ],
    `Get a reference to a ${storeType} from within a Provider component ` +
      'context',
  );

  const useHook = addInternalFunction(
    `useHook`,
    storeOrStoreId +
      `: ${storeOrStoreIdType} | undefined, ` +
      `hook: (...args: any[]) => any, preArgs: any[], postArgs: any[] = []`,
    [
      `const ${storeInstance} = ${getStoreHook}(${storeOrStoreId} as Id);`,
      `return hook(...preArgs, ((${storeOrStoreId} == null || ` +
        `typeof ${storeOrStoreId} == 'string')`,
      `? ${storeInstance} : ${storeOrStoreId})?.getStore(), ...postArgs)`,
    ],
  );

  if (!objIsEmpty(tablesSchema)) {
    const [tablesType, tableIdType, tablesTypes] =
      sharedTableTypes as SharedTableTypes;
    addImport(0, moduleDefinition, tablesType, tableIdType);

    addImport(1, 'tinybase/ui-react');
    addImport(1, moduleDefinition, storeType, tablesType, tableIdType);

    addProxyHook(
      TABLES,
      TABLES,
      tablesType,
      getTheContentOfTheStoreDoc(1, 0) + AND_REGISTERS,
    );

    addProxyHook(
      TABLE_IDS,
      TABLE_IDS,
      tableIdType + SQUARE_BRACKETS,
      getIdsDoc(TABLE, THE_STORE) + AND_REGISTERS,
    );

    addProxyHook(
      'Set' + TABLES + CALLBACK,
      'Set' + TABLES + CALLBACK,
      PARAMETERIZED_CALLBACK,
      getTheContentOfTheStoreDoc(1, 9) + BASED_ON_A_PARAMETER,
      'getTables: (parameter: Parameter, store: Store) => Tables, ' +
        'getTablesDeps?: React.DependencyList',
      'getTables, getTablesDeps',
      '<Parameter,>',
      'then?: (store: Store, tables: Tables) => void, ' +
        'thenDeps?: React.DependencyList',
      'then, thenDeps',
    );

    mapTablesSchema((tableId: Id, tableName: string, TABLE_ID: string) => {
      const [tableType, rowType, _rowWhenSetType, cellIdType] = mapGet(
        tablesTypes,
        tableId,
      ) as TableTypes;

      addImport(0, moduleDefinition, tableType, rowType, cellIdType);
      addImport(1, moduleDefinition, tableType, rowType, cellIdType);

      addProxyHook(
        tableName + TABLE,
        TABLE,
        tableType,
        getTableContentDoc(tableId) + AND_REGISTERS,
        EMPTY_STRING,
        TABLE_ID,
      );

      addProxyHook(
        tableName + ROW_IDS,
        ROW_IDS,
        IDS,
        getIdsDoc(ROW, getTableDoc(tableId)) + AND_REGISTERS,
        EMPTY_STRING,
        TABLE_ID,
      );

      addProxyHook(
        tableName + SORTED_ROW_IDS,
        SORTED_ROW_IDS,
        IDS,
        getIdsDoc(ROW, getTableDoc(tableId), 1) + AND_REGISTERS,
        'cellId?: ' +
          cellIdType +
          ', descending?: boolean, offset?: number, limit?: number',
        TABLE_ID + ', cellId, descending, offset, limit',
      );

      addProxyHook(
        tableName + ROW,
        ROW,
        rowType,
        getRowContentDoc(tableId) + AND_REGISTERS,
        'rowId: ' + ID,
        TABLE_ID + ', rowId',
      );

      addProxyHook(
        tableName + CELL_IDS,
        CELL_IDS,
        cellIdType + SQUARE_BRACKETS,
        getIdsDoc(CELL, getRowDoc(tableId)) + AND_REGISTERS,
        'rowId: ' + ID,
        TABLE_ID + ', rowId',
      );

      addProxyHook(
        'Set' + tableName + TABLE + CALLBACK,
        'Set' + TABLE + CALLBACK,
        PARAMETERIZED_CALLBACK,
        getTableContentDoc(tableId, 9) + BASED_ON_A_PARAMETER,
        `getTable: (parameter: Parameter, store: Store) => ${tableType}, ` +
          'getTableDeps?: React.DependencyList',
        TABLE_ID + ', getTable, getTableDeps',
        '<Parameter,>',
        `then?: (store: Store, table: ${tableType}) => void, ` +
          'thenDeps?: React.DependencyList',
        'then, thenDeps',
      );

      addProxyHook(
        'Set' + tableName + ROW + CALLBACK,
        'Set' + ROW + CALLBACK,
        PARAMETERIZED_CALLBACK,
        getRowContentDoc(tableId, 9) + BASED_ON_A_PARAMETER,
        'rowId: Id, getRow: (parameter: Parameter, store: Store) => ' +
          rowType +
          ', getRowDeps?: React.DependencyList',
        TABLE_ID + ', rowId, getRow, getRowDeps',
        '<Parameter,>',
        `then?: (store: Store, row: ${rowType}) => void, ` +
          'thenDeps?: React.DependencyList',
        'then, thenDeps',
      );

      mapCellSchema(
        tableId,
        (cellId, type, defaultValue, CELL_ID, cellName) => {
          addProxyHook(
            tableName + cellName + CELL,
            CELL,
            type + (isUndefined(defaultValue) ? OR_UNDEFINED : EMPTY_STRING),
            getCellContentDoc(tableId, cellId) + AND_REGISTERS,
            'rowId: ' + ID,
            TABLE_ID + ', rowId, ' + CELL_ID,
          );
        },
      );
    });
  }

  if (!objIsEmpty(valuesSchema)) {
    const [valuesType, valueIdType] = sharedValueTypes as SharedValueTypes;
    addProxyHook(
      VALUES,
      VALUES,
      valuesType,
      getTheContentOfTheStoreDoc(2, 0) + AND_REGISTERS,
    );

    addProxyHook(
      VALUE_IDS,
      VALUE_IDS,
      valueIdType + SQUARE_BRACKETS,
      getIdsDoc(VALUE, THE_STORE) + AND_REGISTERS,
    );

    mapValuesSchema((valueId, type, _, VALUE_ID, valueName) =>
      addProxyHook(
        valueName + VALUE,
        VALUE,
        type,
        getValueContentDoc(valueId) + AND_REGISTERS,
        EMPTY_STRING,
        VALUE_ID,
      ),
    );
  }

  addComponent(
    'Provider',
    `{${storeInstance}, ${storeInstance}ById, children}: ` +
      providerPropsType +
      ' & {children: React.ReactNode}',
    [
      USE_CONTEXT,
      'return (',
      '<Context.Provider',
      'value={useMemo(',
      `() => [${storeInstance} ?? contextValue[0], ` +
        `{...contextValue[1], ...${storeInstance}ById}],`,
      `[${storeInstance}, ${storeInstance}ById, contextValue],`,
      ')}>',
      '{children}',
      '</Context.Provider>',
      ');',
    ],
    'Wraps part of an application in a context that provides default objects ' +
      'to be used by hooks and components within',
  );

  // --

  return [
    build(...getImports(0), ...getTypes(), ...getFunctions(0)),
    build(...getImports(1), ...getConstants(), ...getFunctions(1)),
  ];
};