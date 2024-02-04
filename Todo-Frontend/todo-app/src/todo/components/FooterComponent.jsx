import { AuthContext } from "./security/AuthContenxt";
import { useContext } from "react";

export function FooterComponent() {

    const authcontext = useContext(AuthContext)

    return (
        <footer className='footer'>
            <div className='container'>
                Footer
            </div>
        </footer>
    );
}

