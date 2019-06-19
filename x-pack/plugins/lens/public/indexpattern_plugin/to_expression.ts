/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import _ from 'lodash';

import { IndexPatternPrivateState, IndexPatternColumn } from './indexpattern';
import { operationDefinitionMap, OperationDefinition } from './operations';

export function toExpression(state: IndexPatternPrivateState) {
  if (state.columnOrder.length === 0) {
    return null;
  }

  const columns = state.columnOrder.map(colId => state.columns[colId]);

  function getEsAggsConfig<C extends IndexPatternColumn>(column: C, columnId: string) {
    // Typescript is not smart enough to infer that definitionMap[C['operationType']] is always OperationDefinition<C>,
    // but this is made sure by the typing of the operation map
    const operationDefinition = (operationDefinitionMap[
      column.operationType
    ] as unknown) as OperationDefinition<C>;
    return operationDefinition.toEsAggsConfig(column, columnId);
  }

  if (columns.length) {
    const aggs = columns.map(col => {
      const columnId = state.columnOrder.find(colId => state.columns[colId] === col)!;
      return getEsAggsConfig(col, columnId);
    });

    const idMap = columns.reduce(
      (currentIdMap, col, index) => {
        const columnId = state.columnOrder.find(colId => state.columns[colId] === col)!;
        return {
          ...currentIdMap,
          [`col-${index}-${columnId}`]: columnId,
        };
      },
      {} as Record<string, string>
    );

    return `esaggs
      index="${state.currentIndexPatternId}"
      metricsAtAllLevels=false
      partialRows=false
      aggConfigs='${JSON.stringify(aggs)}' | lens_rename_columns idMap='${JSON.stringify(idMap)}'`;
  }

  return null;
}
