import React from 'react';
import { Link, useForm } from '@inertiajs/react';

const NavBar = () => {
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post('/logout');
    };

    return (
        <nav className="bg-sky-950 p-4 py-8">
            <div className="container mx-auto flex items-center">
                <div className="text-2xl font-bold flex items-center ml-6">
                    <Link href="/" className="flex items-center">
                        <div className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 p-2 rounded-lg">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1" width="10" height="10" fill="white"/>
                                <rect x="13" y="1" width="10" height="10" fill="white"/>
                                <rect x="7" y="7" width="10" height="10" fill="white"/>
                                <rect x="1" y="13" width="10" height="10" fill="white"/>
                                <rect x="13" y="13" width="10" height="10" fill="white"/>
                            </svg>
                        </div>
                        <span className="ml-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent">BalancePlus</span>
                    </Link>
                </div>
                <ul className="flex space-x-4 ml-8">
                    <li>
                        <Link href="/" className="text-white hover:text-green-400 flex items-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 12h3v8H3v-8zm5-4h3v12H8V8zm5 2h3v10h-3V10zm5-6h3v16h-3V4z" fill="#3B82F6"/>
                            </svg>
                            <span className="ml-2">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/receitas" className="text-white hover:text-green-400 flex items-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L12 22M12 2L8 6M12 2L16 6" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 12H20" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="ml-2">Receitas</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/despesas" className="text-white hover:text-green-400 flex items-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22L12 2M12 22L8 18M12 22L16 18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 12H20" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="ml-2">Despesas</span>
                        </Link>
                    </li>
                </ul>
                <div className="ml-auto mr-6">
                    <button
                        onClick={handleLogout}
                        className="text-white hover:text-red-400 flex items-center transition-colors duration-200"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="ml-2">Sair</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
