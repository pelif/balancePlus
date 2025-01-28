import React, { useState, useEffect } from 'react';
import Inertia from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';

const ListAccounts = ({
    accountsFixed,
    accountsVariable,
    type,
    handleEdit,
    totalFixed,
    totalVariable
}) => {

    const [label, setLabel] = useState('');
    const [primaryClass, setPrimaryClass] = useState('');
    const [secondaryClass, setSecondaryClass] = useState('');
    const [classCard, setClassCard] = useState('');

    console.log(type);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('pt-BR', options).format(new Date(dateString));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };


    const handleDelete = (account) => {
        console.log(account);
    }

    useEffect(() => {
        console.log('Type:', type);
        setLabel(type === 1 ? 'Receitas' : 'Despesas');

        setPrimaryClass(type === 1 ? 'bg-green-600' : 'bg-red-600');

        setSecondaryClass(type === 1 ? 'bg-emerald-800' : 'bg-red-800');

        setClassCard(type === 1 ? 'bg-sky-600' : 'bg-red-500');

        console.log('Label:', label);
        console.log('Secondary Class:', secondaryClass);
        console.log('Class Card:', classCard);
    }, [type]);

    return (

            <div className="container mx-auto p-4">

                {/* Contas Fixas */}
                <div className={`grid gap-4 ${primaryClass} p-2 rounded-md text-white`}>
                    <div className="font-bold">{label} Fixas</div>
                </div>

                <div className="grid grid-cols-5 gap-4 bg-gray-100 p-2 rounded-md">
                    <div className="font-bold">Título</div>
                    <div className="font-bold">Data de Vencimento</div>
                    <div className="font-bold">Valor</div>
                    <div className="font-bold">Pago</div>
                    <div className="font-bold">Ações</div>
                </div>

                {accountsFixed.length > 0 && accountsFixed.map((account, index) => (
                    <div className="grid grid-cols-5 gap-4 border-b p-2 items-center" key={index}>
                        <div>{account.title}</div>
                        <div>{formatDate(account.due_date)}</div>
                        <div>{formatCurrency(account.value)}</div>
                        <div>{account.is_paid ? 'Sim' : 'Não'}</div>
                        <div className="flex space-x-2">
                            <button
                                className="text-blue-500 hover:text-blue-700">
                                {/* Ícone de Visualizar (Olho) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01M12 12h.01M9 12h.01M12 6.5c-3.5 0-6.5 2.5-6.5 5.5s3 5.5 6.5 5.5 6.5-2.5 6.5-5.5-3-5.5-6.5-5.5z" />
                                </svg>
                            </button>
                            <button
                                className="text-green-500 hover:text-green-700"
                                onClick={() => handleEdit(account)}>
                                {/* Ícone de Editar (Lápis) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h2m-1 0v14m-7-7h14" />
                                </svg>
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                                {/* Ícone de Excluir (Lixeira) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}

                {/* Total Contas Fixas */}
                <div className={`grid grid-cols-2 gap-4 ${primaryClass} p-2 rounded-md text-white`}>
                    <div className="font-bold">Total {label} Fixas:</div>
                    <div className='font-bold text-xl'>  {formatCurrency(totalFixed)}</div>
                </div>


                {/* Contas Variáveis */}
                <div className={`grid gap-4 ${secondaryClass} p-2 rounded-md text-white mt-12`}>
                    <div className="font-bold">{label} Variáveis</div>
                </div>

                <div className="grid grid-cols-5 gap-4 bg-gray-100 p-2 rounded-md">
                    <div className="font-bold">Título</div>
                    <div className="font-bold">Data de Vencimento</div>
                    <div className="font-bold">Valor</div>
                    <div className="font-bold">Pago</div>
                    <div className="font-bold">Ações</div>
                </div>

                {accountsVariable.length > 0 && accountsVariable.map((account, index) => (
                    <div className="grid grid-cols-5 gap-4 border-b p-2 items-center" key={index}>
                        <div>{account.title}</div>
                        <div>{formatDate(account.due_date)}</div>
                        <div>{formatCurrency(account.value)}</div>
                        <div>{account.is_paid ? 'Sim' : 'Não'}</div>

                        <div className="flex space-x-2">
                            <button
                                className="text-blue-500 hover:text-blue-700">
                                {/* Ícone de Visualizar (Olho) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01M12 12h.01M9 12h.01M12 6.5c-3.5 0-6.5 2.5-6.5 5.5s3 5.5 6.5 5.5 6.5-2.5 6.5-5.5-3-5.5-6.5-5.5z" />
                                </svg>
                            </button>
                            <button
                                className="text-green-500 hover:text-green-700"
                                onClick={() => handleEdit(account)}>
                                {/* Ícone de Editar (Lápis) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h2m-1 0v14m-7-7h14" />
                                </svg>
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                                {/* Ícone de Excluir (Lixeira) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}

                {/* Total Contas Variáveis */}
                <div className={`grid grid-cols-2 gap-4 ${secondaryClass} p-2 rounded-md text-white`}>
                    <div className="font-bold">Total {label} Variáveis:</div>
                    <div className='font-bold text-xl'>  {formatCurrency(totalVariable)}</div>
                </div>

                 {/* Card de Total de Receitas */}
                <div className="flex justify-center mt-12">
                    <div className={`bg-white shadow-lg rounded-lg p-6 w-full max-w-md ${classCard} text-white`}>
                        <h2 className="text-2xl font-bold text-gray-600 mb-4">Total de {label}</h2>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-400">{label} Fixas:</span>
                            <span className="text-lg font-bold text-gray-400">{formatCurrency(totalFixed)}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-lg font-semibold text-gray-400">{label} Variáveis:</span>
                            <span className="text-lg font-bold text-gray-400">{formatCurrency(totalVariable)}</span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-400">Total:</span>
                            <span className="text-xl font-bold text-gray-400">{formatCurrency(totalFixed + totalVariable)}</span>
                        </div>
                    </div>
                </div>


            </div>
    );
};

export default ListAccounts;
