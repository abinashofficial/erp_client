import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Main from './routes/routes';
const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Main/>
            </Router>
        </AuthProvider>
    );
};
export default App;