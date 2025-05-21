import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex justify-between bg-[url(/public/assets/images/bg-login.jpg)] bg-cover bg-center bg-no-repeat w-full">
            <div className="p-8 bg-opacity-50 flex justify-center items-center mx-auto w-[60%]">
                <div className="bg-opacity-50 w-full">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full bg-opacity-60">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent mt-12">
                            BalancePlus
                        </h1>
                        <p className="text-gray-600 mt-2 font-roboto text-lg leading-7">
                           ✅ Controle de suas finanças pessoais e empresariais.
                        </p>
                        <p className="text-gray-600 mt-2 font-roboto text-lg leading-7 mt-10">
                           📈 Ferramentas para análise e mitigação de riscos em operações de renda variável.
                        </p>
                        <p className="text-gray-600 mt-2 font-roboto text-lg leading-7 mt-10">
                           📊 Dashboard para acompanhamento de suas finanças.
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-8 flex justify-center items-center bg-gray-200 w-[40%] bg-opacity-70">
                <div className="bg-opacity-100 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
