import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';
import { Container } from 'react-bootstrap';
import { WidgetLoader } from '../components/WidgetLoader';

export const Reportes = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    return (
        <>
            <AuthenticatedTemplate>
                <Container>
                    {activeAccount ? ( <h2><center>Reportes para {activeAccount.name} / {activeAccount.extension_Organizacion}</center></h2> ) 
                                : ( <h2><center>Reportes</center></h2> ) }
                    <table>
                        <tr>
                            <td><WidgetLoader widgetId='webdatarocks'/></td>
                        </tr>
                        <tr>
                            <td><WidgetLoader widgetId='onfire'/></td>
                        </tr>
                    </table>
                </Container>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h3><center>El usuario {activeAccount && activeAccount.username ? activeAccount.username : 'Desconocido'} no tiene permisos para ver este página.</center></h3>
            </UnauthenticatedTemplate>
        </>
    );
};