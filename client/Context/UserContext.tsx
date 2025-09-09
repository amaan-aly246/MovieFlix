import React, { createContext, ReactNode, useState } from "react";

interface UserContextType {
  watchList: string[];
  setWatchList: React.Dispatch<React.SetStateAction<string[]>>;
  reccMoviesDetails: MovieDetails[]
  setReccMoviesDetails: (value: MovieDetails[]) => void;
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

  const [reccMoviesDetails, setReccMoviesDetails] = useState<MovieDetails[]>([]);
  return (
    <UserContext.Provider value={{ watchList, setWatchList, reccMoviesDetails, setReccMoviesDetails }}>
      {children}
    </UserContext.Provider>
  );
}
