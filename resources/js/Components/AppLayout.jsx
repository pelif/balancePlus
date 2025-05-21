import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const AppLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;
