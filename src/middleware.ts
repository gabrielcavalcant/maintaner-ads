import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "../locales";
import { decryptData } from "./helper/crypty";
import { AuthToken, User } from "./types";
import { cookies } from "next/headers";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

// Dicionário de permissões mapeando rotas para permissões necessárias
const permissionDictionary: Record<string, string> = {};

// Função para verificar se o usuário tem a permissão necessária
const hasPermission = (
  userPermissions: any,
  requiredPermission: string
): boolean => {
  let allPermissions: string[] = [];

  if (userPermissions && requiredPermission) {
    Object.keys(userPermissions).forEach((key) => {
      const permission = userPermissions[key as keyof any];

      if (Array.isArray(permission)) {
        allPermissions = allPermissions.concat(permission);
      } else {
        allPermissions.push(permission);
      }
    });

    return allPermissions.includes(requiredPermission);
  }
  return false;
};

export default async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const encryptedSession = cookieStore.get("session")?.value;
  if (encryptedSession) {
    try {
      const decryptedSession = decryptData(encryptedSession);
      const parsedSession: AuthToken = JSON.parse(decryptedSession);
      const decodedSession = {
        ...jwtDecode(parsedSession.access_token),
      } as User;
      const userPermissions = decodedSession.permission;

      // Remove o prefixo da linguagem da URL antes de procurar a permissão
      let pathWithoutLanguage = req.nextUrl.pathname.replace(
        /\/(pt|en|ja|es)/,
        ""
      );

      // Verifica se a rota está no dicionário de permissões
      let requiredPermission = permissionDictionary[pathWithoutLanguage];

      // Se não encontrou a rota exata, procura por uma rota dinâmica
      if (!requiredPermission) {
        const dynamicRoute = Object.keys(permissionDictionary).find((route) => {
          // Remove parâmetros dinâmicos da rota para encontrar a permissão correta
          const routeWithoutParams = route.replace(/\[\w+\]/g, "[^/]+");
          return (
            route.includes("[") &&
            new RegExp(`^${routeWithoutParams}`).test(pathWithoutLanguage)
          );
        });
        if (dynamicRoute) {
          requiredPermission = permissionDictionary[dynamicRoute];
        }
      }
      console.log("Permissão requerida:", requiredPermission);

      // Verifica se a rota requer permissão e se o usuário tem essa permissão
      if (
        requiredPermission &&
        !hasPermission(userPermissions, requiredPermission)
      ) {
        console.log("Acesso negado. Permissão requerida não encontrada.");

        return NextResponse.redirect(
          new URL("/portal/pt/unauthorized", req.nextUrl)
        );
      }
    } catch (error) {
      console.error("Erro ao processar a sessão:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Chama o middleware de tradução
  return createMiddleware({
    locales: locales,
    defaultLocale: "pt",
    localeDetection: false,
  })(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
};
