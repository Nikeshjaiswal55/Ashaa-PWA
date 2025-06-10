import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

import '../src/style.css';
import Layout from './components/Layout';
import { store } from './redux/store';
import Pages from './routes/Pages';

// import Page1 from './pages/Home';
// import Page2 from './pages/Onboarding';

function App() {
  return (
    <Fragment>
      <Notifications />
      <SW />
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            {/* <Home /> */}
            <Pages />
            {/* <Page2/> */}
          </Layout>
          {/* <ProfilePage /> */}
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
