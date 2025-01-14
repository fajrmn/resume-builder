import React from 'react';
import EditableField from './EditableField';

interface DeletableFieldProps {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

const DeletableField: React.FC<DeletableFieldProps> = ({
  value,
  onChange,
  onDelete,
  placeholder,
  icon
}) => {
  return (
    <div className="group flex items-center space-x-2 relative">
      {icon && <span className="text-gray-400">{icon}</span>}
      <div className="flex-grow">
        <EditableField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
        className="absolute -right-6 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default DeletableField;
