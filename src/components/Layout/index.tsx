import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hiddenLayoutPaths = [
    '/DataCollectionForm',
    '/profile',
    '/onboarding/farmer',
    '/onboarding/farm',
    '/onboarding',

    // '/DataCollectionForm/farmer'
  ];
  const shouldHideLayout = hiddenLayoutPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-dvh">
      {!shouldHideLayout && <Header />}
      <main className={`flex-grow ${!shouldHideLayout ? 'pt-[70px] pb-[60px]' : ''}`}>
        {children}
      </main>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default Layout;
