"use client";

import { IWhitelistData, WhitelistType } from '@/types/promotion';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WhitelistConsts {
    // getters
    whitelistType: WhitelistType,
    whitelistData: IWhitelistData | null,
    showWhitelistModal: boolean,
    // setters
    setWhitelistType: (type: WhitelistType) => void,
    setWhitelistData: (type: IWhitelistData) => void,
    setShowWhitelistModal: (type: boolean) => void,
}

const WhitelistContext = createContext<WhitelistConsts>({
    whitelistType: WhitelistType.NONE,
    whitelistData: null,
    showWhitelistModal: false,
    setWhitelistType: () => { },
    setWhitelistData: () => { },
    setShowWhitelistModal: () => { },
});

// Create a custom hook to use the context
export const useWhitelist = () => useContext(WhitelistContext);

// Define the provider component
export const WhitelistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Forms Data
    const [whitelistType, setWhitelistType] = useState<WhitelistType>(WhitelistType.NONE);
    const [whitelistData, setWhitelistData] = useState<IWhitelistData | null>(null);
    const [showWhitelistModal, setShowWhitelistModal] = useState<boolean>(false);

    return (
        <WhitelistContext.Provider value={{
            whitelistType, setWhitelistType,
            whitelistData, setWhitelistData,
            showWhitelistModal, setShowWhitelistModal,
        }}>
            {children}
        </WhitelistContext.Provider>
    );
};