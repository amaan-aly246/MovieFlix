import React, { createContext, ReactNode, useState } from "react";

interface UserContextType {
  watchList: string[];
  setWatchList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [watchList, setWatchList] = useState<string[]>([]);

  return (
    <UserContext.Provider value={{ watchList, setWatchList }}>
      {children}
    </UserContext.Provider>
  );
}
