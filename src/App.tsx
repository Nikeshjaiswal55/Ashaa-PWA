import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

// import CssBaseline from '@mui/material/CssBaseline';
import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
// import Header from '@/sections/Header';
// import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import { Provider } from 'react-redux';
import '../src/style.css';
import Footer from './components/FooterBar/Footer';
import Header from './components/Header/Header';
import Page1 from './pages/Page1';
import { store } from './redux/store';
import Stepper from './components/common/Steaper';

// import Sidebar from '@/sections/Sidebar';

function App() {
  return (
      <Fragment>
      <Notifications />
      <SW />
      <Provider store={store}> {/* 👈 Redux store wrap yaha karo */}
        <BrowserRouter>
          {/* <Header />
          <Pages />
          <Page1 />
          <Footer /> */}
          <Stepper/>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
