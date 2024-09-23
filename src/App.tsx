import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import './styles/App.css';
import Main from './routes/routes';
import { createContext, useState } from 'react';
// export const locateContext = createContext<any>({});

interface SignupFormData {
  employee_id:any;
  first_name: any;
  last_name: any;
  mobile_number: any;
  email: any;
  date_of_birth: any;
  gender: any;
  password: any;
  confirmPassword:any;
}
const App: React.FC = () => {


  const [empDetail, setEmpDetail] = useState<SignupFormData>({
    employee_id:'',
    first_name: '',
    last_name: '',
    mobile_number: '',
    email: '',
    date_of_birth: '',
    gender: '',
    password: '',
    confirmPassword:'',
  });
    return (
      
        <AuthProvider>
            <Router>
                <Main/>
            </Router>
        </AuthProvider>
    );
};

export default App;








