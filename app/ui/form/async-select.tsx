import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";

interface AsyncSelectProps {
    name: string;
    id: string;
    placeholder: string;
    loadOptions: (inputValue: string, callback: (options: Option[]) => void) => Promise<Option[]> | void;
}

interface Option {
    value: string;
    label: string;
}

export default function AsyncSelectComponent({
    name,
    id,
    placeholder,
    loadOptions
}: AsyncSelectProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    return isMounted ? (
        <AsyncSelect<{ value: string; label: string }>
            name={name}
            id={id}
            placeholder={placeholder}
            classNamePrefix="react-select"
            loadOptions={loadOptions}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: state.isFocused ? '2px solid #3B82F6' : '1px solid #D1D5DB',
                    borderRadius: '0.375rem',
                    padding: '0.5rem 2.5rem 0.5rem 2.5rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : undefined,
                    '&:hover': {
                        borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB',
                    },
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: '#6B7280',
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: '0.375rem',
                    marginTop: '0.25rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused ? '#E5E7EB' : undefined,
                    color: state.isSelected ? '#1F2937' : '#374151',
                    '&:active': {
                        backgroundColor: '#D1D5DB',
                    },
                }),
                input: (baseStyles) => ({
                    ...baseStyles,
                    paddingLeft: '0',
                }),
                valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    padding: '0',
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    marginLeft: '0',
                }),
            }}
        />
    ) : null
}
