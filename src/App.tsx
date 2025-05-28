import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

import '../src/style.css';
import Layout from './components/Layout';
import FarmerDetailsForm from './pages/DataCollectionForm';
import { store } from './redux/store';

function App() {
  return (
    <Fragment>
      <Notifications />
      <SW />
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            {/* <Home /> */}
            <FarmerDetailsForm />
            {/* <FarmingExperienceDetails/> */}
            {/* <FarmerLiveStock/> */}
            {/* <Page2 /> */}
          </Layout>
          {/* <ProfilePage /> */}
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
