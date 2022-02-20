import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../src/authConfig";

function handleLogin(instance) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will redirect the page to a login prompt
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <button className="ml-auto" type="button" onClick={() => handleLogin(instance)}>
            Sign in
        </button>
    );
}