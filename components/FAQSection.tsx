import React, { useState } from 'react';

const faqData = [
  {
    question: "What are your shipping options?",
    answer: "We offer standard shipping (5-7 business days) and expedited shipping (2-3 business days) within the United States. International shipping times and costs may vary. All options will be presented at checkout."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns on unworn, unwashed items with tags attached within 30 days of purchase for a full refund or exchange. Please visit our Shipping & Returns page for more details on how to initiate a return."
  },
  {
    question: "How do I know which size to order?",
    answer: "We recommend checking our detailed Size Guide page, which has specific measurements for all our product categories (Men's, Women's, and Kids'). If you're between sizes, we generally suggest sizing up for a more comfortable fit."
  },
  {
    question: "Are your materials authentic?",
    answer: "Absolutely. We pride ourselves on using high-quality, authentic materials like genuine leather, 100% cotton denim, and pure virgin wool for our products. Many of our items are also handcrafted by skilled artisans."
  }
];

const FAQItem: React.FC<{
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-text-primary">{item.question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
           <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
            <p className="pt-2 pr-8 text-text-secondary">
              {item.answer}
            </p>
        </div>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl font-serif font-bold">Frequently Asked Questions</h2>
      <div className="mt-8 max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;