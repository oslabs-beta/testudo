import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import Projects from './Projects.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App () {
    const [projectIDState, setProjectIDState] = useState('');

    return (
        <div>
            <Routes>
                <Route path="/" element= {<Login />} />
                <Route path="/signup" element= {<SignUp />} />
                <Route path="/home" element= {
                    <ProtectedRoute >
                        <Projects setProjectIDState={setProjectIDState}/>
                    </ProtectedRoute>
                } />
                <Route path="/dashboard/*" element= {
                    <ProtectedRoute>
                        <Dashboard projectIDState={projectIDState} />
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    )
}

export default App;
