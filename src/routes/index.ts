import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: ' ',
    icon: undefined,
  },
  [Pages.Page1]: {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '/home',
    title: 'Page 1',
    icon: undefined,
  },
  [Pages.ChangePassword]: {
    component: asyncComponentLoader(() => import('@/pages/ChangePassword')),
    path: '/change-password',
    title: 'Change Password',
    icon: undefined,
  },
  [Pages.Profile]: {
    component: asyncComponentLoader(() => import('@/pages/Profile')),
    path: '/profile',
    title: 'Profile',
  },

  [Pages.Page2]: {
    component: asyncComponentLoader(() => import('@/pages/Onboarding/onboarding1')),
    path: '/onboarding',
    title: 'farm and farmer onboarding',
    icon: undefined,
  },

  [Pages.FarmerFarmOnboardingProgress]: {
    component: asyncComponentLoader(() => import('@/pages/Onboarding/FarmerOnboardingProgress')),
    path: '/onboarding/farmer-farm/progress',
    title: 'Farmer & Farm Onboarding Progress',
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
