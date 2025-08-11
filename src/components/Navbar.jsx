import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';


function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">AvaGT APP</Link>
      <img src="/logoBlanco.png" alt="Logo" width="40" height="40" />
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          {isAuthenticated() && (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
          )}
          {!isAuthenticated() ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sigin">Registro</Link>
              </li>
            </>
          )  : (
            <li className="nav-item">
              <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                LogOut
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;