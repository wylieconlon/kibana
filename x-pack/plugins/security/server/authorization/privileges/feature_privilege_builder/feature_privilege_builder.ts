/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { KibanaFeature, FeatureKibanaPrivileges } from '../../../../../features/server';
import { Actions } from '../../actions';

export interface FeaturePrivilegeBuilder {
  getActions(privilegeDefinition: FeatureKibanaPrivileges, feature: KibanaFeature): string[];
}
export abstract class BaseFeaturePrivilegeBuilder implements FeaturePrivilegeBuilder {
  constructor(protected readonly actions: Actions) {}

  public abstract getActions(
    privilegeDefinition: FeatureKibanaPrivileges,
    feature: KibanaFeature
  ): string[];
}
