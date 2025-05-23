import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// import CssBaseline from '@mui/material/CssBaseline';
import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
// import Header from '@/sections/Header';
// import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

import '../src/style.css';
import Apitest from './components/common/Apitest';
import { store } from './redux/store';

function App() {
  return (
    <Fragment>
      <Notifications />
      <SW />
      <Provider store={store}>
        {' '}
        {/* 👈 Redux store wrap yaha karo */}
        <BrowserRouter>
          <Apitest />
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
