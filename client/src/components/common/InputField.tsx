import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, className, ...props }) => {
  const inputId = id || label.toLowerCase().replace(/\s/g, '-');
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={inputId}
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          className || ''
        }`}
        {...props}
      />
    </div>
  );
};

export default InputField;