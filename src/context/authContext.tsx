"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthToken, User } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { ApiRequest } from "@/helper/request.module";
import { decryptData, encryptData } from "@/helper/crypty";
import toast from "react-hot-toast";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  signIn: (values: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string; error?: any }>;
  signOut: () => void;
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const signIn = (values: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; message?: string; error?: any }> => {
    return new Promise(async (resolve, reject) => {
      toast.remove();
      const API = new ApiRequest();
      const { email, password } = values;

      try {
        const response: AuthToken = await API.ApiRequest("auth/local/signin", {
          email,
          password,
        });

        if (response?.statusCode === 403) {
          reject({ success: false, message: "Email ou senha incorretos." });
        }

        const token: string = response?.access_token;
        const permissions = response?.permission;

        if (response?.statusCode === 401) {
          reject({ success: false, message: "Email ou senha incorretos." });
        }
        if (token) {
          const userData = {
            ...jwtDecode(token),
            permission: permissions,
          } as User;
          setUser(userData);
          const encryptedData = encryptData(
            JSON.stringify({ ...response, permission: userData.permission })
          );
          Cookies.set("session", encryptedData, {
            secure: true,
            sameSite: "strict",
            expires: 1,
          });
          resolve({ success: true });
        } else {
          reject({ success: false, message: "Login falhou." });
        }
      } catch (error) {
        reject({ success: false, message: "Erro no servidor.", error });
      }
    });
  };

  const signOut = useCallback(() => {
    setUser(null);
    Cookies.remove("session");
    Cookies.remove("pref_theme");
    router.replace("/");
  });

  useEffect(() => {
    const encryptedSession = Cookies.get("session");
    if (encryptedSession) {
      const decryptedSession = decryptData(encryptedSession);
      const parsedSession: AuthToken = JSON.parse(decryptedSession);
      try {
        const userData = {
          ...jwtDecode(parsedSession.access_token),
          permission: parsedSession.permission,
        } as User;
        setUser(userData);
      } catch (error) {
        signOut();
      }
    } else {
      signOut();
    }
    setIsLoading(false);
  }, []);

  const values = useMemo(() => {
    return {
      signIn,
      signOut,
      user,
      isLoading,
    };
  }, [isLoading, signOut, user]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
