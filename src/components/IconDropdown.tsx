import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaAddressCard, 
  FaLinkedin, 
  FaGithub, 
  FaGlobe, 
  FaSlash 
} from 'react-icons/fa';

export type IconType = 'phone' | 'email' | 'contact' | 'linkedin' | 'github' | 'website' | 'none';

interface IconOption {
  type: IconType;
  label: string;
  icon: React.ElementType;
}

const iconOptions: IconOption[] = [
  { type: 'phone', label: 'Phone', icon: FaPhone },
  { type: 'email', label: 'Email', icon: FaEnvelope },
  { type: 'contact', label: 'Contact', icon: FaAddressCard },
  { type: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
  { type: 'github', label: 'GitHub', icon: FaGithub },
  { type: 'website', label: 'Website', icon: FaGlobe },
  { type: 'none', label: 'None', icon: FaSlash }
];

interface IconDropdownProps {
  currentIcon: IconType;
  onChange: (icon: IconType) => void;
}

const IconDropdown: React.FC<IconDropdownProps> = ({ currentIcon, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleIconSelect = (icon: IconType) => {
    onChange(icon);
    setIsOpen(false);
  };

  const CurrentIcon = iconOptions.find(opt => opt.type === currentIcon)?.icon || FaSlash;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <CurrentIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {iconOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.type}
                onClick={() => handleIconSelect(option.type)}
                className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  currentIcon === option.type ? 'bg-gray-100' : ''
                }`}
              >
                <Icon className="mr-3 w-4 h-4" />
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IconDropdown;
