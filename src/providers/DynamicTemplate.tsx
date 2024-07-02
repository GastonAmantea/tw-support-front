"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface IColorAccents {
    backgroundColor: string,
    primaryColor: string,
    fontColor: string,
    fontName: string,
    navbarLogo: string,
    loadingLogo: string
}

interface TemplateConsts {
    // getters
    template: IColorAccents,
    // setters
    setTemplate: (value: IColorAccents) => void,
    kyc: boolean,
    setKyc: (value: boolean) => void,
    showCheckout: boolean,
    setShowCheckout: (value: boolean) => void,    
}

const defaultCombination: IColorAccents = 
{
    backgroundColor: '#000000',
    primaryColor: '#F480F5',
    fontColor: '#FFFFFF',
    fontName: 'Archivo',
    navbarLogo: 'https://assets-global.website-files.com/652fd3604fc43790185bbda1/6544f64a37f3f224975dcf68_lowlogo-p-500.png',
    loadingLogo: 'https://assets-global.website-files.com/652fd3604fc43790185bbda1/6544f64a37f3f224975dcf68_lowlogo-p-500.png'
}

const TemplateContext = createContext<TemplateConsts>({
    template: defaultCombination,
    setTemplate: () => { },
    kyc: false,
    setKyc: () => { },
    showCheckout: false,
    setShowCheckout: () => { },            
});

// Create a custom hook to use the context
export const useTemplate = () => useContext(TemplateContext);

// Define the provider component
export const DynamicTemplateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Forms Data
    const [template, setTemplate] = useState<IColorAccents>(defaultCombination);
    const [kyc, setKyc] = useState<boolean>(false);
    const [showCheckout, setShowCheckout] = useState<boolean>(false);

    return (
        <TemplateContext.Provider value={{
            template, setTemplate,
            kyc, setKyc,
            showCheckout, setShowCheckout
        }}>
            {children}
        </TemplateContext.Provider>
    );
};