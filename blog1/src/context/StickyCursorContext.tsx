"use client";

import React, { createContext, useContext, useState } from "react";

interface StickyCursorContextType {
    stickyElement: HTMLElement | null;
    setStickyElement: (element: HTMLElement | null) => void;
}

const StickyCursorContext = createContext<StickyCursorContextType | undefined>(undefined);

export const StickyCursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [stickyElement, setStickyElement] = useState<HTMLElement | null>(null);

    return (
        <StickyCursorContext.Provider value={{ stickyElement, setStickyElement }}>
            {children}
        </StickyCursorContext.Provider>
    );
};

export const useStickyCursor = () => {
    const context = useContext(StickyCursorContext);
    if (!context) {
        throw new Error("useStickyCursor must be used within a StickyCursorProvider");
    }
    return context;
};
