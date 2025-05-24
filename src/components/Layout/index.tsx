import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-dvh">
            <Header />
            <main className="flex-grow pt-[70px] pb-[60px]">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
