import { createContext, useContext, useState } from "react";

// Create Context
const RegistrationContext = createContext();

// Provider Component
export function RegistrationProvider({ children }) {
    const [studentData, setStudentData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        contactNumberAlternative: "",
    });

    return (
        <RegistrationContext.Provider value={{ studentData, setStudentData }}>
            {children}
        </RegistrationContext.Provider>
    );
}

// Custom Hook to use Context
export function useRegistration() {
    return useContext(RegistrationContext);
}
