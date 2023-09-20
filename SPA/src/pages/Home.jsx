import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';
import { Container } from 'react-bootstrap';
import { IdTokenData } from '../components/DataDisplay';

/***
 * Component to detail ID token claims with a description for each claim. For more details on ID token claims, please check the following links:
 * ID token Claims: https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token
 * Optional Claims:  https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims#v10-and-v20-optional-claims-set
 */
export const Home = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    return (
        <>
            <AuthenticatedTemplate>
                <Container>
                    { activeAccount ? 
                        ( <h2><center>Bienvenido {activeAccount.name}</center></h2> ) 
                        : null 
                    }
                </Container>
                { activeAccount && activeAccount.username === 'jacuevasp@gmail.com' ? 
                    ( <Container>
                        <IdTokenData idTokenClaims={activeAccount.idTokenClaims} />
                      </Container> 
                    ) 
                    : null 
                }
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h2><center>There is nobody home.</center></h2>
            </UnauthenticatedTemplate>
        </>
    );
};