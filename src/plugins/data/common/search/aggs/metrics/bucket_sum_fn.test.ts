/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { functionWrapper } from '../test_helpers';
import { aggBucketSum } from './bucket_sum_fn';

describe('agg_expression_functions', () => {
  describe('aggBucketSum', () => {
    const fn = functionWrapper(aggBucketSum());

    test('handles customMetric and customBucket as a subexpression', () => {
      const actual = fn({
        customMetric: fn({}),
        customBucket: fn({}),
      });

      expect(actual.value.params).toMatchInlineSnapshot(`
        Object {
          "customBucket": Object {
            "enabled": true,
            "id": undefined,
            "params": Object {
              "customBucket": undefined,
              "customLabel": undefined,
              "customMetric": undefined,
              "json": undefined,
            },
            "schema": undefined,
            "type": "sum_bucket",
          },
          "customLabel": undefined,
          "customMetric": Object {
            "enabled": true,
            "id": undefined,
            "params": Object {
              "customBucket": undefined,
              "customLabel": undefined,
              "customMetric": undefined,
              "json": undefined,
            },
            "schema": undefined,
            "type": "sum_bucket",
          },
          "json": undefined,
        }
      `);
    });

    test('correctly parses json string argument', () => {
      const actual = fn({
        json: '{ "foo": true }',
      });

      expect(actual.value.params.json).toEqual('{ "foo": true }');
    });
  });
});
