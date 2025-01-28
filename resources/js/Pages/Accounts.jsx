import React, { useState, useEffect } from 'react';
import FormAccounts from '../Components/FormAccounts';
import ListAccounts from '../Components/ListAccounts';

const Accounts = ({ categories, accountsFixed, accountsVariable, type, totalFixed, totalVariable }) => {

    const [account, setAccount] = useState({
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

    const handleEdit = (account) => {
        setAccount(account);
    }

    return (
        <div className="flex flex-row gap-4">
            <div className="basis-1/3 border-2 border-gray-300 rounded-md p-4 bg-white">
                <FormAccounts
                    categories={categories}
                    type={type}
                    account={account}
                />
            </div>
            <div className="basis-2/3 border-2 border-gray-300 rounded-md p-4 bg-white">
                <ListAccounts
                    accountsFixed={accountsFixed}
                    accountsVariable={accountsVariable}
                    handleEdit={handleEdit}
                    totalFixed={totalFixed}
                    totalVariable={totalVariable}
                    type={type}
                />
            </div>
        </div>
    );
};

export default Accounts;

