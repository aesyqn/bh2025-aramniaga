import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className = '',
    type = 'button',
    onClick,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/30",
        secondary: "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30",
        outline: "border-2 border-gray-200 text-gray-600 hover:border-teal-500 hover:text-teal-500 bg-transparent",
        ghost: "text-gray-600 hover:bg-gray-100 bg-transparent"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-6 py-4 text-lg"
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
