"use client";
import { createContext, useEffect, useState } from "react";
import { User } from "../types";

type UserContextType = {
  user: null | User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (user !== null && user.accessToken) {
      localStorage.setItem("accessToken", user.accessToken);
    }
  }, [user]);

  useEffect(() => {
    if (window) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        let status = 200;
        fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            if (!res.ok) {
              status = res.status;
            }
            return res.json();
          })
          .then((data) => {
            if (status === 200) {
              setUser(data);
            } else {
              setUser(null);
            }
          });
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
