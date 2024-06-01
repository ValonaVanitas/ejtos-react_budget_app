import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../CurrencySelector.css';

const CurrencySelector = () => {
    const { dispatch, currency } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: event.target.value,
        });
    };

    return (
        <div className='currency-selector'>
            <label htmlFor="currency" className='currency-label'>Currency:</label>
            <select id="currency" value={currency} onChange={handleCurrencyChange} className="custom-select currency-dropdown">
                <option value="£">£ Pound</option>
                <option value="$">$ Dollar</option>
                <option value="€">€ Euro</option>
                <option value="₹">₹ Rupee</option>
            </select>
        </div>
    );
};

export default CurrencySelector;