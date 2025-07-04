import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: undefined,
  },
  [Pages.Page1]: {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '/home',
    title: 'Page 1',
    icon: undefined,
  },

  [Pages.Page2]: {
    component: asyncComponentLoader(() => import('@/pages/Onboarding')),
    path: '/onboarding',
    title: 'farm and farmer onboarding',
    icon: undefined,
  },
  [Pages.DataCollectionFormFarmer]: {
    component: asyncComponentLoader(() => import('@/pages/DataCollectionForm/FarmerDetails')),
    path: '/onboarding/farmer',
    title: 'FarmerDetails',
    icon: undefined,
  },
  [Pages.DataCollectionFormFarm]: {
    component: asyncComponentLoader(() => import('@/pages/DataCollectionForm/FarmDetails')),
    path: '/onboarding/farm',
    title: 'DataCollectionFarmForm',
    icon: undefined,
  },
  [Pages.farmer]: {
    component: asyncComponentLoader(() => import('@/pages/DataCollectionForm/farmer')),
    path: '/farmer/:id',
    title: 'farmers farm',
    icon: undefined,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
