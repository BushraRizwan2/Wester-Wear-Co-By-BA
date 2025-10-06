import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const SizeGuidePage: React.FC = () => {
    const crumbs = [{ label: 'Home', path: '/' }, { label: 'Size Guide' }];

    const renderTable = (headers: string[], data: string[][], caption: string) => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border">
                <caption className="p-4 text-lg font-semibold text-left text-text-primary bg-gray-50">{caption}</caption>
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map(header => (
                            <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold text-text-primary uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="even:bg-gray-50">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const womensHeaders = ['Size', 'Bust (in)', 'Waist (in)', 'Hips (in)'];
    const womensData = [
        ['XS (0-2)', '32-33', '25-26', '35-36'],
        ['S (4-6)', '34-35', '27-28', '37-38'],
        ['M (8-10)', '36-37', '29-30', '39-40'],
        ['L (12-14)', '38-40', '31-33', '41-43'],
        ['XL (16)', '41-43', '34-36', '44-46'],
    ];

    const mensHeaders = ["Size", "Chest (in)", "Waist (in)"];
    const mensData = [
        ["S", "36-38", "29-31"],
        ["M", "39-41", "32-34"],
        ["L", "42-44", "35-37"],
        ["XL", "45-48", "38-41"],
        ["XXL", "49-52", "42-45"],
    ];

    const kidsHeaders = ["Size", "Age", "Height (in)", "Weight (lbs)"];
    const kidsData = [
        ["2T", "2 years", "33-35", "27-30"],
        ["3T", "3 years", "36-38", "30-33"],
        ["4T", "4 years", "39-41", "34-38"],
        ["5", "5 years", "42-44", "39-43"],
        ["6", "6 years", "45-47", "44-49"],
    ];

    return (
        <div className="bg-surface p-4 sm:p-8 rounded-lg shadow-lg">
            <Breadcrumbs crumbs={crumbs} />
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary mb-6 text-center">Size Guide</h1>

            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">How to Measure</h2>
                    <p className="text-text-secondary">
                        To ensure the best fit, compare your measurements with our charts. For best results, measure over undergarments.
                        <br />
                        <strong>Bust/Chest:</strong> Measure around the fullest part of your chest.
                        <br />
                        <strong>Waist:</strong> Measure around your natural waistline.
                        <br />
                        <strong>Hips:</strong> Measure around the fullest part of your hips.
                    </p>
                </div>
                
                {renderTable(womensHeaders, womensData, "Women's Sizing")}
                {renderTable(mensHeaders, mensData, "Men's Sizing")}
                {renderTable(kidsHeaders, kidsData, "Kids' Sizing")}

                 <div className="text-center text-sm text-text-secondary pt-6 border-t">
                    <p>Please note: These charts are for reference only. Fit may vary by style and personal preference.</p>
                    <p>If you have any questions, feel free to contact our customer support.</p>
                </div>
            </div>
        </div>
    );
};

export default SizeGuidePage;