/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { ExpressionFunctionDefinition, Datatable } from 'src/plugins/expressions/public';

interface FormatColumn {
  format: string;
  columnId: string;
  decimals?: number;
  rangeParameters?: string;
}

export const supportedFormats: Record<
  string,
  { decimalsToPattern: (decimals?: number) => string }
> = {
  number: {
    decimalsToPattern: (decimals = 2) => {
      if (decimals === 0) {
        return `0,0`;
      }
      return `0,0.${'0'.repeat(decimals)}`;
    },
  },
  percent: {
    decimalsToPattern: (decimals = 2) => {
      if (decimals === 0) {
        return `0,0%`;
      }
      return `0,0.${'0'.repeat(decimals)}%`;
    },
  },
  bytes: {
    decimalsToPattern: (decimals = 2) => {
      if (decimals === 0) {
        return `0,0b`;
      }
      return `0,0.${'0'.repeat(decimals)}b`;
    },
  },
};

export const formatColumn: ExpressionFunctionDefinition<
  'lens_format_column',
  Datatable,
  FormatColumn,
  Datatable
> = {
  name: 'lens_format_column',
  type: 'datatable',
  help: '',
  args: {
    format: {
      types: ['string'],
      help: '',
      required: true,
    },
    columnId: {
      types: ['string'],
      help: '',
      required: true,
    },
    decimals: {
      types: ['number'],
      help: '',
    },
    rangeParameters: {
      types: ['string'],
      help: '',
    },
  },
  inputTypes: ['datatable'],
  fn(input, { format, columnId, decimals, rangeParameters }: FormatColumn) {
    return {
      ...input,
      columns: input.columns.map((col) => {
        if (col.id === columnId) {
          const {
            template,
            replaceInfinity,
            nestedFormat,
          }: {
            template?: string;
            replaceInfinity?: boolean;
            nestedFormat?: string;
          } = rangeParameters ? JSON.parse(rangeParameters) : {};

          const extraParams = { template, replaceInfinity };

          if (supportedFormats[format]) {
            return {
              ...col,
              meta: {
                ...col.meta,
                params: {
                  id: format,
                  params: { pattern: supportedFormats[format].decimalsToPattern(decimals) },
                },
              },
            };
          }
          if (nestedFormat && supportedFormats[nestedFormat]) {
            return {
              ...col,
              meta: {
                ...col.meta,
                params: {
                  id: format,
                  params: {
                    id: nestedFormat,
                    params: {
                      pattern: supportedFormats[nestedFormat].decimalsToPattern(decimals),
                    },
                    ...extraParams,
                  },
                },
              },
            };
          }
          return {
            ...col,
            meta: {
              ...col.meta,
              params: {
                id: format,
                params: { ...extraParams },
              },
            },
          };
        }
        return col;
      }),
    };
  },
};
