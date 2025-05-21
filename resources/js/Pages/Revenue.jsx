import React from 'react';
import FormRevenue from '../Components/FormRevenue';
import ListRevenue from '../Components/ListRevenue';

const Revenue = ({ categories }) => {

    return (
        <div className="flex flex-row gap-4">
            <div className="basis-1/3 shadow-md rounded-md p-4 bg-white">
                <FormRevenue
                    categories={categories}
                />
            </div>
            <div className="basis-2/3 shadow-md rounded-md p-4 bg-white">
                <ListRevenue />
            </div>
        </div>
    );
};

export default Revenue;
