import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import '../src/style.css';
import Apitest from './components/common/Apitest';
import { store } from './redux/store';
import Home from './pages/Home';
import Layout from './components/Layout';
import ProfilePage from './pages/Profile';


function App() {
  return (
    <Fragment>
      <Notifications />
      <SW />
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Home />
          </Layout>
          {/* <ProfilePage /> */}
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
