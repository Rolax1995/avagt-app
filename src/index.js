import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import Login from './routes/Login';
import SignIn from './routes/SignIn';
import ProtectedRoute from './routes/Dashboard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sigin" element={<SignIn />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              Hola Mundo
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);




/*import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/
