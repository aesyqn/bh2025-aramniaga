import React from 'react';

const InputGroup = ({
    label,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
    name,
    required = false,
    className = ''
}) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
          w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all duration-200 outline-none
          ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                        : 'border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10'
                    }
        `}
            />
            {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
        </div>
    );
};

export default InputGroup;
