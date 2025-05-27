import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

import Pages from '../src/routes/Pages/Pages';
import '../src/style.css';
import Layout from './components/Layout';
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

            {/* <Page2 /> */}
            <Pages />
          </Layout>
          {/* <ProfilePage /> */}
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
