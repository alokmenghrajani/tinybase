/** @jsx createElement */

import {ExtraProps, TableProps} from '../types/ui-react';
import {TablesView, useStore} from '../ui-react';
import {getUniqueId, useToggle} from './common';
import {DEFAULT} from '../common/strings';
import {Id} from '../types/common';
import React from 'react';
import {SortedTableInHtmlTable} from '../ui-react-dom';
import {StoreProp} from './types';
import {createElement} from '../ui-react/common';
import {isUndefined} from '../common/other';

const {useCallback} = React;

const TableView = ({
  storeId,
  s: inspectorStore,
  ...props
}: TableProps & ExtraProps) => {
  const [open, handleToggle] = useToggle(
    'table',
    getUniqueId(storeId, props.tableId),
    inspectorStore,
  );
  return (
    <details open={open} onToggle={handleToggle}>
      <summary>Table: {props.tableId}</summary>
      <SortedTableInHtmlTable
        {...props}
        limit={10}
        paginator={true}
        sortOnClick={true}
      />
    </details>
  );
};

export const StoreView = ({
  storeId,
  s: inspectorStore,
}: {readonly storeId?: Id} & StoreProp) => {
  const store = useStore(storeId);
  const [open, handleToggle] = useToggle(
    'store',
    getUniqueId(storeId),
    inspectorStore,
  );
  const getTableComponentProps = useCallback(
    () => ({storeId, s: inspectorStore}),
    [storeId, inspectorStore],
  );

  return isUndefined(store) ? null : (
    <details open={open} onToggle={handleToggle}>
      <summary>Store: {storeId ?? DEFAULT}</summary>
      <TablesView
        store={store}
        tableComponent={TableView}
        getTableComponentProps={getTableComponentProps}
      />
    </details>
  );
};
