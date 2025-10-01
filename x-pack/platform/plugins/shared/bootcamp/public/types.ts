/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { SharePluginStart, SharePluginSetup } from '@kbn/share-plugin/public';
import type { BootcampDashboardsService } from './services/bootcamp_dashboards_service';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BootcampPublicSetup {}

// what we export to other plugins
export interface BootcampPublicStart {
  dashboardsService: BootcampDashboardsService;
}

export interface BootcampPublicPluginSetup {
  share: SharePluginSetup;
}

export interface BootcampPublicPluginStart {
  share: SharePluginStart;
}
