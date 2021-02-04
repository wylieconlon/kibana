/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

export default function ({ loadTestFile }) {
  describe('documents source', function () {
    loadTestFile(require.resolve('./docvalue_fields'));
    loadTestFile(require.resolve('./search_hits'));
    loadTestFile(require.resolve('./top_hits'));
  });
}
