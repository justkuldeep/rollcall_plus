/**
 * Web Crypto API based AES-256-CBC implementation
 * Matches the backend implementation
 */

const AES_KEY_STR = import.meta.env.VITE_ULTRASONIC_AES_KEY || 'default-secret-key-32-chars-long-!!!';
const AES_IV_STR = import.meta.env.VITE_ULTRASONIC_AES_IV || 'default-iv-16-ch';

async function getCryptoKey(keyStr: string): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyData = enc.encode(keyStr);
    return crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "AES-CBC" },
        false,
        ["encrypt", "decrypt"]
    );
}

export async function encryptPayload(data: any): Promise<string> {
    const key = await getCryptoKey(AES_KEY_STR);
    const iv = new TextEncoder().encode(AES_IV_STR);
    const enc = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv },
        key,
        enc.encode(JSON.stringify(data))
    );

    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

export async function decryptPayload(base64Data: string): Promise<any> {
    const key = await getCryptoKey(AES_KEY_STR);
    const iv = new TextEncoder().encode(AES_IV_STR);
    const encryptedData = new Uint8Array(atob(base64Data).split("").map(c => c.charCodeAt(0)));

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv },
        key,
        encryptedData
    );

    return JSON.parse(new TextDecoder().decode(decrypted));
}
