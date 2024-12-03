'use client'



import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
        token="96341892d452f1734fb1f641308a7fefca242bf7"
        onChange={(data) => onChange?.(data?.value)}/>
    )
}