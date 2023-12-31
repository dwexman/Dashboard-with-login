import { Nav, Navbar, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { loginRequest, b2cPolicies } from '../authConfig';
import Topbar from '../pages/global/TopBar';
import Dashboard from '../pages/dashboard';

export const NavigationBar = () => {
    const { instance, inProgress } = useMsal();
    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest).catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        instance.logoutRedirect();
    };

    const handleProfileEdit = () => {
        if (inProgress === InteractionStatus.None) {
            instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
        }
    };

    return (
        <>  
            <Navbar bg="$gray-500" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">
                    
                </a>
                <AuthenticatedTemplate>
                    <Nav.Link className="navbarButton" href="/">
                        Inicio
                    </Nav.Link>
                    <Nav.Link className="navbarButton" href="/dashboard">
                        Dashboard
                    </Nav.Link>
                    <Nav.Link className="navbarButton" href="/reportes">
                        Reportes
                    </Nav.Link>
                    <Nav.Link className="navbarButton" href="/config">
                        Configuración
                    </Nav.Link>
                    <Nav.Link className="navbarButton" href="/geography">
                        Geografía
                    </Nav.Link>
                    <Nav.Link className="navbarButton" href="/bar">
                        Bar Chart
                    </Nav.Link>
                    <Nav.Link className="navbarButton" href="/calendar">
                        Calendario
                    </Nav.Link>
                    
                    <div className="collapse navbar-collapse justify-content-end">
                        <DropdownButton bg="dark"
                            variant="warning"
                            drop="down"
                            title={activeAccount && activeAccount.username ? activeAccount.username : 'Desconocido'}
                        >
                            <Dropdown.Item as="button" onClick={handleProfileEdit}>
                            Modificar Pérfil
                            </Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLogoutRedirect}>
                                Sign out
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <div className="collapse navbar-collapse justify-content-end">
                        <Button variant="secondary" className="ml-auto" drop="start" title="Sign In" onClick={handleLoginRedirect}>
                            Sign In
                        </Button>
                    </div>
                </UnauthenticatedTemplate>
            </Navbar>
            
        </>
    );
};
