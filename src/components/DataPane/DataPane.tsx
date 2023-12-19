import { useState } from 'react';

const DataPane = () => {
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');

    const handleStartDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDateTime(event.target.value);
    };

    const handleEndDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDateTime(event.target.value);
    };

    const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedProduct(event.target.value);
    };

    const handleQueryData = () => {
        // Perform data query based on startDateTime, endDateTime, and selectedProduct
        // Update the list of found data
    };

    return (
        <div>
            <div>
                <label htmlFor="startDateTime">Start DateTime:</label>
                <input type="datetime-local" id="startDateTime" value={startDateTime} onChange={handleStartDateTimeChange} />
            </div>
            <div>
                <label htmlFor="endDateTime">End DateTime:</label>
                <input type="datetime-local" id="endDateTime" value={endDateTime} onChange={handleEndDateTimeChange} />
            </div>
            <div>
                <label htmlFor="product1">
                    <input type="radio" id="product1" name="product" value="Product 1" checked={selectedProduct === 'Product 1'} onChange={handleProductChange} />
                    Product 1
                </label>
            </div>
            <div>
                <label htmlFor="product2">
                    <input type="radio" id="product2" name="product" value="Product 2" checked={selectedProduct === 'Product 2'} onChange={handleProductChange} />
                    Product 2
                </label>
            </div>
            <button onClick={handleQueryData}>Query Data</button>
            {/* Display the list of found data here */}
        </div>
    );
};

export default DataPane;
