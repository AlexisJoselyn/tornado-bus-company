import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { ActionMeta, SingleValue } from "react-select";

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
    const [selectedValue, setSelectedValue] = useState<SingleValue<Option>>(null);


    useEffect(() => setIsMounted(true), []);

    const handleChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
        setSelectedValue(newValue);
    };

    const handleFocus = () => {
        if (selectedValue) {
            setSelectedValue(null);
        }
    };

    return isMounted ? (
        <AsyncSelect<{ value: string; label: string }>
            name={name}
            id={id}
            placeholder={placeholder}
            classNamePrefix="react-select"
            loadOptions={loadOptions}
            value={selectedValue}
            onChange={handleChange}
            onFocus={handleFocus}
            styles={{
                control: (baseStyles, state) => {
                    console.log('contro baseStyles', baseStyles, 'state', state)
                    return{
                    ...baseStyles,
                    border: state.isFocused ? '2px solid #3B82F6' : '2px solid black',
                    borderRadius: '0.375rem',
                    padding: '0.2rem 2.5rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : undefined,
                    '&:hover': {
                        borderColor: state.isFocused ? '#3B82F6' : 'black',
                    },
                    width: '240px',
                }},
                indicatorsContainer: (baseStyles) => ({
                    ...baseStyles,
                    display: 'none',
                }),
            }}
        />
    ) : null
}
