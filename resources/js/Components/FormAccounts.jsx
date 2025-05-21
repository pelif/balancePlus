import React, { useState, useEffect } from 'react';
import Inertia from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';

const FormAccounts = ({ categories, type, account: initialAccount }) => {

    const [label, setLabel] = useState('');
    const [endpoint, setEndpoint] = useState('');

    const [account, setAccount] = useState({
        title: '',
        description: '',
        origin: '',
        type: type,
        is_fixed: true,
        is_paid: false,
        value: '',
        due_date: '',
        category_id: '',
        ...initialAccount
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        let formattedValue = value;
        if (name === 'due_date') {
            // Extrair apenas a parte da data
            formattedValue = value.split(' ')[0];
        }

        setAccount({
            ...account,
            [name]: type === 'checkbox' ? checked : formattedValue
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (account.id) {
            router.put(`/${endpoint}/${account.id}`, account, {
                onSuccess: () => {
                    setAccount({
                    title: '',
                    description: '',
                    origin: '',
                    type: type,
                    is_fixed: true,
                    is_paid: false,
                    value: '',
                    due_date: '',
                        category_id: ''
                    });
                }
            });
        } else {
            router.post(`/${endpoint}`, account, {
                onSuccess: () => {
                    setAccount({
                        title: '',
                        description: '',
                        origin: '',
                        type: type,
                        is_fixed: true,
                        is_paid: false,
                        value: '',
                        due_date: '',
                        category_id: ''
                    });
                }
            });
        }
    }

    useEffect(() => {
        setLabel(type === 1 ? 'Contas a Receber' : 'Contas a Pagar');
        setEndpoint(type === 1 ? 'receitas' : 'despesas');
        setAccount({
            title: '',
            description: '',
            origin: '',
            type: type,
            is_fixed: true,
            is_paid: false,
            value: '',
            due_date: '',
            category_id: '',
            ...initialAccount
        });
    }, [initialAccount, type]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 p-4 rounded-md">
                <h2 className="text-xl font-bold">Cadastro de {label}</h2>
                <div className="flex flex-col gap-2">

                    <label htmlFor="title">
                        Tïtulo da Conta
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={account.title}
                        onChange={handleInputChange} />

                    <label htmlFor="description">Descrição <small>(Adicione um breve descrição da conta)</small></label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={account.description}
                        onChange={handleInputChange} />

                    <label htmlFor="origin">Origem</label>
                    <input
                        type="text"
                        id="origin"
                        name="origin"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={account.origin}
                        onChange={handleInputChange} />

                    <label htmlFor="category">Categoria</label>
                    <select
                        id="category"
                        name="category_id"
                        className="bg-white border-2 border-gray-300 rounded-md p-2"
                        value={account.category_id}
                        onChange={handleInputChange}>
                        <option value="">Selecione uma categoria</option>
                        {categories.map((category, index) => (
                            <option
                                className='border-2 border-gray-300 rounded-md p-2 text-gray-500 py-6'
                                value={category.id}
                                key={index}>{category.title}</option>
                        ))}
                    </select>

                    <div className="flex flex-wrap items-center my-4">
                        <label htmlFor="isFixed">Esta conta é fixa</label>
                        <input
                            type="checkbox"
                            id="isFixed"
                            name="is_fixed"
                            className="ml-2 p-2 w-4 h-4 rounded focus:ring-2 focus:ring-blue-500 transition duration-200"
                            checked={account.is_fixed}
                            onChange={handleInputChange} />

                        <label htmlFor="isPaid" className='ms-8'>Esta conta já foi paga</label>
                        <input
                            type="checkbox"
                            id="isPaid"
                            name="is_paid"
                            className="ml-2 p-2 w-4 h-4 rounded focus:ring-2 focus:ring-blue-500 transition duration-200"
                            checked={account.is_paid}
                            onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-wrap items-center my-4">
                        <div className="w-1/2">
                            <label htmlFor="dueDate">Data de vencimento</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="due_date"
                                className="border-2 border-gray-300 rounded-md p-2 ms-2"
                                value={account.due_date.split(' ')[0]}
                                onChange={handleInputChange} />
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="value">Valor <strong>(R$)</strong></label>
                            <input
                                type="text"
                                id="value"
                                name="value"
                                className="border-2 border-gray-300 rounded-md p-2 ms-2"
                                value={account.value}
                                onChange={handleInputChange} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-950 text-white px-4 py-2 rounded-md">
                            Salvar
                    </button>

                </div>
            </div>
        </form>
    );
};

export default FormAccounts;

