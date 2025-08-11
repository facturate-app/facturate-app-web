import axios from "axios";
import { decrypt } from "../utils/EncryptUtils.js";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
});

// Interceptor para el token
instance.interceptors.request.use(
    (config) => {
        // Verifica si la URL o la solicitud requiere autenticación
        const encryptedToken = localStorage.getItem("authentication");
        if (
            config.url.includes('web-app') && 
            (encryptedToken === null || isTokenExpired(decrypt(encryptedToken)))
        ) {
            toast.error('Sesión vencida');
            localStorage.clear();
            setTimeout(() => {
                window.location.reload();
            }, 1000);

            return Promise.reject('Sesión vencida'); // Termina la ejecución del interceptor
        }

        config.headers.Authorization = encryptedToken ? decrypt(encryptedToken) : undefined;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function isTokenExpired(token) {
    const decoded = parseJwt(token);
    const currentTime = Date.now() / 1000; // Convertir a segundos
    return decoded.exp < currentTime; // Comparar la fecha de expiración
}

export default instance;