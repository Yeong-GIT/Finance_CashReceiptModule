import React from 'react';
import axios from 'axios';

const GenerateDataButton = ({ onGenerated }) => {
    const handleGenerateData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/generate-data');
            console.log('Generated Data:', response.data);
            // Optionally, call the callback to refresh the receipts list
            if (onGenerated) {
                onGenerated();
            }
        } catch (error) {
            console.error('Error generating data:', error);
        }
    };

    return (
        <button onClick={handleGenerateData}>Generate Cash Receipts</button>
    );
};

export default GenerateDataButton;
