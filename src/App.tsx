import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Main from './routes/routes';
const App: React.FC = () => {
    return (
            <Router>
                        <AuthProvider>

                <Main/>
                        </AuthProvider>

            </Router>
    );
};
export default App;