import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const totalSpent = expenses.reduce((total, item) => total + item.cost, 0);

    useEffect(() => {
        if (newBudget >= 20000) {
            setNewBudget(20000);
        }

        if (newBudget <= totalSpent) {
            setNewBudget(totalSpent);
        }
    }, [newBudget, totalSpent]);

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value);

        if (isNaN(value)) {
            setNewBudget('');
            return;
        }

        if (value >= totalSpent && value <= 20000) {
            setNewBudget(value);
        } else if (value > 20000) {
            alert(`The value cannot exceed the maximum budget limit of ${currency}20,000.`);
            setNewBudget(budget);  // Reset to current budget value
        } else if (value < totalSpent) {
            alert(`The value cannot be less than the total allocated amount of ${currency}${totalSpent}.`);
            setNewBudget(budget);  // Reset to current budget value
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleBudgetUpdate();
        }
    };

    const handleBudgetUpdate = () => {
        if (newBudget >= totalSpent && newBudget <= 20000) {
            dispatch({
                type: 'SET_BUDGET',
                payload: newBudget,
            });
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}{budget}</span>
            <input
                type="number"
                step="10"
                value={newBudget}
                onChange={handleBudgetChange}
                onKeyPress={handleKeyPress}
                className="form-control"
                min={totalSpent}
                max="20000"
                style={{ maxWidth: '150px' }}
            />
        </div>
    );
};

export default Budget;