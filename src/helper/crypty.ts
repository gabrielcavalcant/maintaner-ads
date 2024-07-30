import CryptoJS from "crypto-js";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_TOKEN_SECRET_KEY ??
  "j3aK1s/tYqABLltaHH3Bt9qYzWqh/qy6sxj4gWqthRk="; // Troque por uma chave segura

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (ciphertext: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedData) {
      throw new Error("Failed to decrypt data");
    }
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Malformed UTF-8 data");
  }
};
