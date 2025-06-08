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
    path: '/page-1',
    title: 'Page 1',
    icon: undefined,
  },

  [Pages.Page2]: {
    component: asyncComponentLoader(() => import('@/pages/Onboarding')),
    path: '/page-2',
    title: 'Page 2',
    icon: undefined,
  },
  [Pages.DataCollectionFormFarmer]: {
    component: asyncComponentLoader(() => import('@/pages/DataCollectionForm/FarmerDetails')),
    path: '/DataCollectionForm/FarmerDetails',
    title: 'FarmerDetails',
    icon: undefined,
  },
  [Pages.DataCollectionFormFarm]: {
    component: asyncComponentLoader(() => import('@/pages/DataCollectionForm/FarmDetails')),
    path: '/DataCollectionForm/FarmDetails',
    title: 'DataCollectionFarmForm',
    icon: undefined,
  },
  [Pages.farmer]: {
    component: asyncComponentLoader(() => import('@/pages/DataCollectionForm/farmer')),
    path: 'DataCollectionForm/farmer',
    title: 'farmer',
    icon: undefined,
  },
  [Pages.Page3]: {
    component: asyncComponentLoader(() => import('@/pages/Page4')),
    path: '/page-3',
    title: 'Page 3',
    icon: undefined,
  },
  [Pages.Page4]: {
    component: asyncComponentLoader(() => import('@/pages/Page4')),
    path: '/page-4',
    title: 'Page 4',
    icon: undefined,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
