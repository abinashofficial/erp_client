import React, { createContext, useContext, useState, ReactNode,useEffect } from 'react';


interface SignupFormData {
    employee_id:any;
    first_name: any;
    last_name: any;
    full_name: any;
    mobile_number: any;
    email: any;
    date_of_birth: any;
    gender: any;
    password: any;
    confirmPassword:any;
    photo_url:any;
    access_token:any;
    country_code:any,
    coins:any,
  }
  
  interface CountryOption {
    value: string;
    label: JSX.Element;
  }



interface AuthContextType {
    isAuthenticated: boolean;
    visible: boolean;
setVisible:(result: boolean) => void
    empDetail:any;
    login: (result: SignupFormData) => void;
    logout: () => void;
    setEmpDetail: (result: SignupFormData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [visible, setVisible] = useState(true);
    const [empDetail, setEmpDetail] = useState<SignupFormData>({
        employee_id:'',
        first_name: '',
        last_name: '',
        full_name: '',
        mobile_number: '',
        email: '',
        date_of_birth: '',
        gender: '',
        password: '',
        confirmPassword:'',
        photo_url:"",
        access_token:"",
        country_code:"",
        coins:0,
      });

    const login = (result: SignupFormData) => {
        setIsAuthenticated(true);
        setEmpDetail({...empDetail,
            employee_id: result.employee_id,
            first_name: result.first_name,
            last_name: result.last_name,
            full_name:result.full_name,
            mobile_number: result.mobile_number,
            email: result.email,
            date_of_birth: result.date_of_birth,
            gender: result.gender,
            password: "",
            photo_url:result.photo_url,
            access_token:result.access_token,
            country_code:result.country_code,
            coins:result.coins,
        })

        console.log("empDetail:-", empDetail)
        const id = window.setTimeout(() => {
            logout();
            alert("Your session has expired. Please log in again.");
        }, 15 * 60 * 1000); // 15 minutes
    
        // Optional: Set an alert for 14 minutes
        const alertId = window.setTimeout(() => {
            alert("Your session will expire in 2 minute. Please save your work.");
        }, 13 * 60 * 1000); // 14 minutes
    
        setTimeoutId(id);
    
        // Clean up the alert timeout when logging out
        return () => {
            clearTimeout(alertId);
        };
    };


    const logout = () => {
        setIsAuthenticated(false);
        if (timeoutId) {
            setTimeoutId(null);
            clearTimeout(timeoutId);
        }
        setEmpDetail({...empDetail,
            employee_id:'',
            first_name: '',
            last_name: '',
            full_name: '',
            mobile_number: '',
            email: '',
            date_of_birth: '',
            gender: '',
            password: '',
            confirmPassword:'',
            photo_url:"",
            access_token:"",
            country_code:"",
            coins:0,
        })
        };


    useEffect(() => {
        // Clean up timeout on component unmount
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, empDetail, login, logout, setEmpDetail, setVisible, visible }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
