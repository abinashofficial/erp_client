import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Main from './routes/routes';
import ScrollToTop from './components/scrolltotop';

const App: React.FC = () => {
    return (
            <Router>
                        <AuthProvider>
<ScrollToTop />
                <Main/>
                        </AuthProvider>

            </Router>
    );
};
export default App;