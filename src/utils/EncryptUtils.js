import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_KEY

export const encrypt = (data) => {
    const enc = CryptoJS.AES.encrypt(data, secretKey).toString();
    return enc;
}

export const decrypt = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
    return bytes
}

