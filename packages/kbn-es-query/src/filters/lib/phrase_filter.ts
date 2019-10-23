/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { get, isPlainObject } from 'lodash';
import { Filter, FilterMeta } from './meta_filter';

export type PhraseFilterMeta = FilterMeta & {
  params: {
    query: string; // The unformatted value
  };
  script?: {
    script: {
      params: any;
    };
  };
  field?: any;
};

export type PhraseFilter = Filter & {
  meta: PhraseFilterMeta;
};

type PhraseFilterValue = string | number | boolean;

export const isPhraseFilter = (filter: any): filter is PhraseFilter => {
  const isMatchPhraseQuery = filter && filter.query && filter.query.match_phrase;

  const isDeprecatedMatchPhraseQuery =
    filter &&
    filter.query &&
    filter.query.match &&
    Object.values(filter.query.match).find((params: any) => params.type === 'phrase');

  return !!(isMatchPhraseQuery || isDeprecatedMatchPhraseQuery);
};

export const isScriptedPhraseFilter = (filter: any): filter is PhraseFilter =>
  Boolean(get(filter, 'script.script.params.value'));

export const getPhraseFilterField = (filter: PhraseFilter) => {
  const queryConfig = filter.query.match_phrase || filter.query.match;
  return Object.keys(queryConfig)[0];
};

export const getPhraseFilterValue = (filter: PhraseFilter): PhraseFilterValue => {
  const queryConfig = filter.query.match_phrase || filter.query.match;
  const queryValue = Object.values(queryConfig)[0] as any;
  return isPlainObject(queryValue) ? queryValue.query : queryValue;
};
