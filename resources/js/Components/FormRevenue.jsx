import React, { useState } from 'react';
import Inertia from '@inertiajs/inertia';
import { router } from '@inertiajs/react';

const FormRevenue = ({ revenue, setRevenue, categories }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        origin: '',
        type: 1,
        isFixed: true,
        isPaid: false,
        value: '',
        dueDate: '',
        category: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/receitas', formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 p-4 rounded-md">
                <h2 className="text-xl font-bold">Cadastro de Conta a Receber</h2>
                <div className="flex flex-col gap-2">

                    <label htmlFor="title">
                        Tïtulo da Conta
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={formData.title}
                        onChange={handleInputChange} />

                    <label htmlFor="description">Descrição <small>(Adicione um breve descrição da conta)</small></label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={formData.description}
                        onChange={handleInputChange} />

                    <label htmlFor="origin">Origem</label>
                    <input
                        type="text"
                        id="origin"
                        name="origin"
                        className="border-2 border-gray-300 rounded-md p-2"
                        value={formData.origin}
                        onChange={handleInputChange} />

                    <label htmlFor="category">Categoria</label>
                    <select
                        id="category"
                        name="category"
                        className="bg-white border-2 border-gray-300 rounded-md p-2"
                        value={formData.category}
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
                            name="isFixed"
                            className="ml-2 p-2 w-4 h-4 rounded focus:ring-2 focus:ring-blue-500 transition duration-200"
                            checked={formData.isFixed}
                            onChange={handleInputChange} />

                        <label htmlFor="isPaid" className='ms-8'>Esta conta já foi paga</label>
                        <input
                            type="checkbox"
                            id="isPaid"
                            name="isPaid"
                            className="ml-2 p-2 w-4 h-4 rounded focus:ring-2 focus:ring-blue-500 transition duration-200"
                            checked={formData.isPaid}
                            onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-wrap items-center my-4">
                        <div className="w-1/2">
                            <label htmlFor="dueDate">Data de vencimento</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                className="border-2 border-gray-300 rounded-md p-2 ms-2"
                                value={formData.dueDate}
                                onChange={handleInputChange} />
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="value">Valor</label>
                            <input
                                type="text"
                                id="value"
                                name="value"
                                className="border-2 border-gray-300 rounded-md p-2 ms-2"
                                value={formData.value}
                                onChange={handleInputChange} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-950 text-white px-4 py-2 rounded-md">
                            Cadastrar
                    </button>

                </div>
            </div>
        </form>
    );
};

export default FormRevenue;

