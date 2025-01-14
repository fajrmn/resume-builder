import React from 'react';

interface SectionHeaderProps {
  title: string;
  onAdd: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onAdd }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <button
        onClick={onAdd}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add {title}
      </button>
    </div>
  );
};

export default SectionHeader;
