/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { HttpStart } from '@kbn/core/public';
import type { BootcampDashboard } from '../../common/types';

export interface GetDashboardsResponse {
  dashboards: BootcampDashboard[];
}

export class BootcampDashboardsService {
  constructor(private readonly http: HttpStart) {}

  async getDashboards() {
    const response = await this.http.get<GetDashboardsResponse>('/internal/bootcamp/dashboards');
    return response.dashboards;
  }
}
