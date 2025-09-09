import { checkAuth } from "@/functions/checkAuth";
import React, { createContext, ReactNode, useEffect, useState } from "react";
interface AuthContextType {
  token: string | null;
  setToken: (valude: string | null) => void;
  userId: string | null;
  isValidating: boolean;
  setUserId: (value: string | null) => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(true);
  useEffect(() => {
    init();
  }, [token]);

  const init = async () => {
    checkAuth(setToken, setUserId, setIsValidating);
  };
  return (
    <AuthContext.Provider value={{ token, setToken, userId, isValidating, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}
