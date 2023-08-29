import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [isLogin, setIsLogin] = useState("");
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogin(user.uid);
            }
        });
    }, []);
    return (
        <LoginContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </LoginContext.Provider>
    );
}

LoginProvider.propTypes = { children: PropTypes.node };
const useLogin = () => useContext(LoginContext);
// eslint-disable-next-line react-refresh/only-export-components
export default useLogin;
