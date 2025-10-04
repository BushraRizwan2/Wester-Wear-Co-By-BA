import React from 'react';

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

interface QuantityStepperProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  ariaLabelPrefix: string;
  inputId?: string;
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({ quantity, onQuantityChange, ariaLabelPrefix, inputId }) => {
  const handleDecrement = () => {
    onQuantityChange(Math.max(1, quantity - 1));
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onQuantityChange(Math.max(1, isNaN(value) ? 1 : value));
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        onClick={handleDecrement}
        className="p-2 text-text-secondary hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
        aria-label={`Decrease ${ariaLabelPrefix}`}
        disabled={quantity <= 1}
      >
        <MinusIcon />
      </button>
      <input
        type="number"
        id={inputId}
        name={inputId}
        min="1"
        value={quantity}
        onChange={handleInputChange}
        className="w-12 text-center border-l border-r border-gray-300 p-2 focus:ring-primary focus:border-primary focus:outline-none"
        aria-label={ariaLabelPrefix.charAt(0).toUpperCase() + ariaLabelPrefix.slice(1)}
      />
      <button
        onClick={handleIncrement}
        className="p-2 text-text-secondary hover:bg-gray-100 focus:outline-none"
        aria-label={`Increase ${ariaLabelPrefix}`}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default QuantityStepper;
