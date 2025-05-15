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

import Footer from './components/FooterBar/Footer';
import Header from './components/Header/Header';
import Page1 from './pages/Page1';

// import Sidebar from '@/sections/Sidebar';

function App() {
  return (
    <Fragment>
      {/* <CssBaseline /> */}
      <Notifications />
      {/* <HotKeys /> */}
      <SW />
      <BrowserRouter>
        {/* <Header /> */}
        {/* <Sidebar /> */}

        <Pages />
        <Header />
        {/* <Card/> */}
        <Page1 />
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
