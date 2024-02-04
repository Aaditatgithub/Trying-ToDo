import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './security/AuthContenxt';

export function HeaderComponent() {

    const authcontext = useContext(AuthContext)
    const isAuthenticated = authcontext.isAuthenticated
    console.log(authcontext);

    function logout(){
        authcontext.logout()
    }

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand ms-2 fs-3 fw-bold text-black" href="https://www.in28minutes.com">in28minutes</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-6">
                                {isAuthenticated && <Link className="nav-link" to="/welcome/in28minutes">Home</Link>}
                            </li>
                            <li className="nav-item fs-6">
                                {isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-6">
                            {!isAuthenticated &&<Link className="nav-link" to="/login">Login</Link>}
                        </li>
                        <li className="nav-item fs-6">
                           {isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout} >Logout</Link>}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    );
}
