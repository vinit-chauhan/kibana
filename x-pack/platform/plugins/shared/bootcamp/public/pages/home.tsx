/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import {
  EuiBasicTable,
  EuiLink,
  EuiLoadingSpinner,
  EuiPageTemplate,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import type { EuiBasicTableColumn } from '@elastic/eui';
import type { BootcampDashboard } from '@kbn/bootcamp-plugin/common/types';
import { i18n } from '@kbn/i18n';
import { useKibana } from '../hooks/use_kibana';
import { useDashboards } from '../hooks/use_dashboards';
import { BOOTCAMP_LOCATOR, type BootcampLocatorParams } from '../../common/locator';

const HomePage = () => {
  const { plugins } = useKibana();
  const { dashboards, error, loading } = useDashboards();

  const dashboardLocator = plugins.share.url.locators.get<BootcampLocatorParams>(BOOTCAMP_LOCATOR);

  const columns: EuiBasicTableColumn<BootcampDashboard>[] = [
    {
      field: 'title',
      name: i18n.translate('xpack.bootcamp.home.titleLabel', {
        defaultMessage: 'Title',
      }),
      sortable: true,
      render: (_, dashboard) => (
        <EuiLink
          onClick={() => {
            dashboardLocator?.navigate({ dashboardId: undefined });
          }}
        >
          {dashboard.title}
        </EuiLink>
      ),
    },
    {
      field: 'description',
      name: i18n.translate('xpack.bootcamp.home.descriptionLabel', {
        defaultMessage: 'Description',
      }),
      sortable: false,
    },
  ];

  return (
    <EuiPageTemplate.Section>
      <EuiText>Bootcamp Home</EuiText>
      <EuiSpacer />
      {loading || !dashboards ? (
        <EuiLoadingSpinner />
      ) : (
        <EuiBasicTable columns={columns} items={dashboards} responsiveBreakpoint={false} />
      )}
    </EuiPageTemplate.Section>
  );
};

// eslint-disable-next-line import/no-default-export
export default HomePage;
