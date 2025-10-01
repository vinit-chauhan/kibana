/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  type CoreSetup,
  type CoreStart,
  type Plugin,
  type AppMountParameters,
  DEFAULT_APP_CATEGORIES,
} from '@kbn/core/public';
import type {
  BootcampPublicSetup,
  BootcampPublicStart,
  BootcampPublicPluginSetup,
  BootcampPublicPluginStart,
} from './types';
import { BootcampDashboardsService } from './services/bootcamp_dashboards_service';
import { BootcampLocator } from '../common/locator';

export class BootcampPlugin
  implements
    Plugin<
      BootcampPublicSetup,
      BootcampPublicStart,
      BootcampPublicPluginSetup,
      BootcampPublicPluginStart
    >
{
  setup(
    coreSetup: CoreSetup<BootcampPublicPluginStart, BootcampPublicStart>,
    plugins: BootcampPublicPluginSetup
  ): BootcampPublicSetup {
    plugins.share.url.locators.create(new BootcampLocator());
    coreSetup.application.register({
      id: 'bootcamp',
      title: 'Bootcamp',
      category: DEFAULT_APP_CATEGORIES.security,
      appRoute: '/app/bootcamp',
      async mount(params: AppMountParameters) {
        const { renderApp } = await import('./application');
        const [coreStart, depsStart, myServices] = await coreSetup.getStartServices();

        return renderApp(coreStart, depsStart, myServices, params);
      },
    });

    return {};
  }

  start(coreStart: CoreStart, plugins: BootcampPublicPluginStart): BootcampPublicStart {
    const dashboardsService = new BootcampDashboardsService(coreStart.http);

    return {
      dashboardsService,
    };
  }
}
