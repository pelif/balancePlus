import React from 'react';
import Navbar from '../Components/NavBar';

const AppLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar sempre visível */}
            <Navbar />

            {/* Conteúdo da página */}
            <div className="p-4">
                {children}
            </div>
        </div>
    );
};

export default AppLayout;
