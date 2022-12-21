import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Data from './routes/Data';

const App = () => {
    return(
        <>
        <Router>
            <Routes>
                <Route path='*' element={<Data />}/>
            </Routes>
        </Router>
        </>
    );
};

export default App;