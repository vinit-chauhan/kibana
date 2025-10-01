/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { type PropsWithChildren, useMemo } from 'react';
import {
  KibanaContextProvider,
  useKibana as useUntypedKibana,
} from '@kbn/kibana-react-plugin/public';
import type { AppMountParameters, CoreStart } from '@kbn/core/public';
import type { BootcampPublicPluginStart, BootcampPublicStart } from '../types';

export interface BootcampAppContext {
  core: CoreStart;
  plugins: BootcampPublicPluginStart;
  params: AppMountParameters;
  myServices: BootcampPublicStart;
}

export function useKibana() {
  return useUntypedKibana<BootcampAppContext>().services;
}

interface BootcampAppContextProviderProps {
  coreStart: CoreStart;
  pluginStart: BootcampPublicPluginStart;
  myServices: BootcampPublicStart;
  params: AppMountParameters;
}

export function BootcampAppContextProvider({
  children,
  coreStart,
  pluginStart,
  params,
  myServices,
}: PropsWithChildren<BootcampAppContextProviderProps>) {
  const servicesForContext = useMemo(() => {
    return {
      core: coreStart,
      plugins: pluginStart,
      params,
      myServices,
    };
  }, [coreStart, pluginStart, params, myServices]);

  return <KibanaContextProvider services={servicesForContext}>{children}</KibanaContextProvider>;
}
