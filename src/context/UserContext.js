
import React, { useState } from "react";
import instance from "../configuration/axios";
import { decrypt, encrypt } from "../utils/EncryptUtils.js";

const UserContext = React.createContext({
    loginGoogle: async (token) => false,
    isLogged: () => false,
    logout: () => { },
    getUser: () => { return { } },    
});

const UserProvider = (props) => {

    const [user, setUser] = useState(undefined);

    const getUser = () => {
        if (user) {
            return user;
        }

        const localUser = localStorage.getItem("user");
        if (localUser === undefined || localUser === null) {
            return;
        }
        const storedUser = JSON.parse(decrypt(localUser));
        setUser(storedUser);
        return { ...storedUser, id: storedUser.email };
    };

    const loginGoogle = async (token) => {
        try {
            const response = await instance({
                method: "post",
                url: "/login/google",
                data: {
                    idToken: token
                }
            });

            await successfullLogin(response);
            return true;
        } catch (error) {
            console.log(error);
            return false
        }
    };

    const successfullLogin = async (response) => {
        localStorage.setItem("authentication", encrypt(response.data.token));
        localStorage.setItem("user", encrypt(JSON.stringify(response.data.user)));
    }

    const logout = () => {
        localStorage.clear();
        setUser(undefined);

    };

    const isLogged = () => {
        return localStorage.getItem("authentication") !== null;
    };

    return (
        <UserContext.Provider value={{
            loginGoogle,
            isLogged,
            logout,
            getUser
        }} {...props} />
    );
};

const useUser = () => React.useContext(UserContext);


export { UserProvider, useUser };