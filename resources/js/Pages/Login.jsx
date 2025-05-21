import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthLayout from '../Components/AuthLayout';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <div className=" bg-white p-8 rounded-lg shadow-md w-[66.66%] justify-self-center">
                <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 p-3 rounded-lg mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="10" height="10" fill="white"/>
                            <rect x="13" y="1" width="10" height="10" fill="white"/>
                            <rect x="7" y="7" width="10" height="10" fill="white"/>
                            <rect x="1" y="13" width="10" height="10" fill="white"/>
                            <rect x="13" y="13" width="10" height="10" fill="white"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent">
                        BalancePlus
                    </h1>
                    <p className="text-gray-600 mt-2">Faça login para acessar sua conta</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3"
                                required
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 hover:from-green-500 hover:via-emerald-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            {processing ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
