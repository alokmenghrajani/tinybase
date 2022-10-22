import {DEFAULT, TYPE} from '../common/strings';
import {camel, getCodeFunctions} from './code';
import {objForEach, objHas, objIsEmpty} from '../common/obj';
import {Schema} from '../store.d';
import {arrayPush} from '../common/array';
import {pairNew} from '../common/pairs';

export const getStoreApi = (
  schema: Schema,
  module: string,
): [string, string] => {
  if (objIsEmpty(schema)) {
    return pairNew('// store has no inferable schema');
  }

  const moduleName = camel(module);
  const storeInterface = camel(module, true);
  const storeInstance = camel(storeInterface);

  const [dsAdd, dsBuild] = getCodeFunctions();
  const [tsAdd, tsBuild] = getCodeFunctions();

  const dsTablesTypes: string[] = [];
  const dsTableTypes: string[] = [];
  const dsTableMethodTypes: string[] = [];

  const tsImports: string[] = [
    `create${storeInterface} as create${storeInterface}Decl,`,
  ];
  const tsTableMethods: string[] = [];
  const tsTableMethodKeys: string[] = [];

  objForEach(schema, (cellSchemas, tableId) => {
    const table = camel(tableId, true);
    arrayPush(dsTablesTypes, `${tableId}: ${table}Table;`);

    arrayPush(
      dsTableTypes,
      `export type ${table}Table = {[rowId: Id]: ${table}Row};`,
      '',
      `export type ${table}Row = {`,
    );
    arrayPush(tsImports, `${table}Table,`);

    objForEach(cellSchemas, (cellSchema, cellId) => {
      arrayPush(
        dsTableTypes,
        `${cellId}${objHas(cellSchema, DEFAULT) ? '' : '?'}: ${
          cellSchema[TYPE]
        };`,
      );
    });
    arrayPush(dsTableTypes, `};`, '');

    arrayPush(dsTableMethodTypes, `get${table}Table(): ${table}Table;`);
    arrayPush(
      tsTableMethods,
      `const get${table}Table = (): ${table}Table => ` +
        `getTable('${tableId}');`,
    );
    arrayPush(tsTableMethodKeys, `get${table}Table,`);
  });

  dsAdd(
    `import {Id, Store} from 'tinybase';`,
    '',
    `export type ${storeInterface}Tables = {`,
    ...dsTablesTypes,
    `};`,
    '',
    ...dsTableTypes,
    `export interface ${storeInterface} {`,
    ` getStore(): Store;`,
    ...dsTableMethodTypes,
    `}`,
    '',
    `export function create${storeInterface}(): ${storeInterface};`,
    '',
  );

  tsAdd(
    `import {Id, Store, createStore} from 'tinybase';`,
    '',
    `import {`,
    ...tsImports.sort(),
    `} from './${moduleName}.d';`,
    '',
    `export const create${storeInterface}: ` +
      `typeof create${storeInterface}Decl = () => {`,
    `const store = createStore();`,
    `const getTable = (tableId: Id) => store.getTable(tableId) as any;`,
    '',
    `const getStore = (): Store => store;`,
    ...tsTableMethods,
    '',
    ` const ${storeInstance} = {`,
    `  getStore,`,
    ...tsTableMethodKeys,
    ` };`,
    '',
    ` return Object.freeze(${storeInstance});`,
    `};`,
    '',
  );

  return [dsBuild(), tsBuild()];
};
