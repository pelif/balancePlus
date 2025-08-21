import React, { useState } from 'react';
import Chart from 'react-apexcharts';


const Home = ({
    totalRevenuesFixed,
    totalRevenuesVariable,
    totalExpansesFixed,
    totalExpansesVariable,
    categories,
    revenuesFixed,
    revenuesVariable,
    expansesFixed,
    expansesVariable
}) => {

    console.log(categories);

    const [options] = useState({
        legend: {
            position: 'bottom',
            height: 100,
            fontSize: '11px',
            markers: {
                width: 8,
                height: 8,
                strokeWidth: 0,
                strokeColor: '#fff',
                radius: 8,
            },
            itemMargin: {
                horizontal: 5,
                vertical: 3
            }
        }
    });

    const [revenuesFixedSeries] = useState(revenuesFixed);
    const [revenuesVariableSeries] = useState(revenuesVariable);
    const [expansesFixedSeries] = useState(expansesFixed);
    const [expansesVariableSeries] = useState(expansesVariable);
    const [labels] = useState(categories);

    const liquidity = (totalRevenuesFixed + totalRevenuesVariable) - (totalExpansesFixed + totalExpansesVariable);

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap gap-4">

                {/* Filtros de Data */}
                {/* Filtros de Data */}
                <div className="w-full shadow-md rounded-md p-4 bg-white mb-4">
                    <h2 className="text-lg font-bold mb-4">Filtros de Data</h2>
                    <form className="flex items-end gap-4">
                        <div className="flex-1">
                            <label htmlFor="initialDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Data Inicial:
                            </label>
                            <input
                                type="date"
                                id="initialDate"
                                name="initialDate"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="finalDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Data Final:
                            </label>
                            <input
                                type="date"
                                id="finalDate"
                                name="finalDate"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Filtrar
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                onClick={() => {
                                    router.get('/', {
                                        initialDate: '',
                                        finalDate: ''
                                    });
                                }}
                            >
                                Limpar
                            </button>
                        </div>
                    </form>
                </div>

                <div className="w-[calc(33.333%-1rem)] h-[400px] shadow-md rounded-md p-4 bg-white">
                    <div className='donut'>
                        <h1>Receitas Fixas por Categoria</h1>
                        <Chart
                        options={{ ...options, labels }}
                        series={revenuesFixedSeries}
                        type="donut"
                        width="380"
                        height="300" />
                    </div>
                </div>
                <div className="w-[calc(33.333%-1rem)] h-[400px] shadow-md rounded-md p-4 bg-white">
                    <div className='donut'>
                        <h1>Receitas Variáveis por Categoria</h1>
                        <Chart options={{ ...options, labels }} series={revenuesVariableSeries} type="donut" width="380" height="300" />
                    </div>
                </div>
                <div className="w-[calc(33.333%-1rem)] h-[400px] shadow-md rounded-md p-4 bg-white">
                    <div className='donut'>
                        <h1>Despesas Fixas por Categoria</h1>
                        <Chart options={{ ...options, labels }} series={expansesFixedSeries} type="donut" width="380" height="300" />
                    </div>
                </div>
                <div className="w-[calc(33.333%-1rem)] h-[400px] shadow-md rounded-md p-4 bg-white">
                    <div className='donut'>
                        <h1>Despesas Variáveis por Categoria</h1>
                        <Chart options={{ ...options, labels }} series={expansesVariableSeries} type="donut" width="380" height="300" />
                    </div>
                </div>

                {/* Grid with Revenues Total */}
                <div className="w-[calc(33.333%-1rem)] shadow-md rounded-md p-4 bg-white">
                    <div className="grid gap-4 bg-green-400 p-2 rounded-md text text-white">
                        <div className="font-bold">Receitas Fixas</div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 border-b p-2 items-center">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenuesFixed)}
                    </div>
                    <div className="grid gap-4 bg-green-400 p-2 rounded-md text text-white">
                        <div className="font-bold">Receitas Variáveis</div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 border-b p-2 items-center">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenuesVariable)}
                    </div>
                    <h2 className="text-4xl font-bold mt-6 mb-2">
                       Liquidez
                    </h2>
                    <div className="grid grid-cols-1 gap-4 border-b p-2 items-center text-2xl font-bold text-green-700">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(liquidity)}
                    </div>
                </div>

                {/* Grid with Expanses Total */}
                <div className="w-[calc(33.333%-1rem)] shadow-md rounded-md p-4 bg-white">
                    <div className="grid gap-4 bg-red-400 p-2 rounded-md text text-white">
                        <div className="font-bold">Despesas Fixas</div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 border-b p-2 items-center">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalExpansesFixed)}
                    </div>
                    <div className="grid gap-4 bg-red-300 p-2 rounded-md text text-white">
                        <div className="font-bold">Despesas Variáveis</div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 border-b p-2 items-center">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalExpansesVariable)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
