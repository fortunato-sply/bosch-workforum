import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/header';
import { Route, Router, Routes } from 'react-router-dom';
import HomePage from './pages/Home/home';
import LoginPage from './pages/Login/login';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/Register/register';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/main' element={
          <ProtectedRoute 
            errorPage={<LoginPage />}
            targetPage={<HomePage />}
          />
        }>
          <Route path='' element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
