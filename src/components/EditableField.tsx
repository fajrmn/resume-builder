import React, { useState, useEffect } from 'react';

interface EditableFieldProps {
  value: string;
  onChange?: (value: string) => void;
  onEdit?: (section: string, index: number, field: string, value: string) => void;
  placeholder?: string;
  section?: string;
  index?: number;
  field?: string;
  isEditing?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  onEdit,
  placeholder = '',
  section = '',
  index = 0,
  field = '',
  isEditing = false
}) => {
  const [editing, setEditing] = useState(isEditing);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const saveChanges = () => {
    if (currentValue !== value) {
      // Prefer onChange if provided
      if (onChange) {
        onChange(currentValue);
      }
      
      // Fallback to onEdit for backwards compatibility
      if (onEdit && section && field) {
        onEdit(section, index, field, currentValue);
      }
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveChanges();
    } else if (e.key === 'Escape') {
      setCurrentValue(value);
      setEditing(false);
    }
  };

  if (!editing) {
    return (
      <div 
        onClick={() => setEditing(true)}
        className="w-full cursor-text"
      >
        {value || placeholder}
      </div>
    );
  }

  return (
    <input
      type="text"
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={saveChanges}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      autoFocus
      className="w-full px-1 py-0.5 border-b border-gray-300 focus:outline-none focus:border-blue-500"
    />
  );
};

export default EditableField;
