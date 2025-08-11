import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/user/login', {
        email,
        password,
      });
      if(!res.data.token) return (alert('Credenciales invalidas.'));
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      alert('Credenciales inválidas');
    }
  };

  return (
    
    <div className="container mt-5">
        <div className="background-header">
            <div className="header-logo">
                <img src="/logoColor.png" alt="logo" className="logo"/>
            </div>
        </div>
        <section className="info-section justify-content-center align-items-center">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary">Ingresar</button>
            </form>
        </section>
    </div>
  );
}

export default Login;
