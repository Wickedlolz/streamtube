"use client";

import { createContext, useContext, useState, PropsWithChildren } from "react";

interface IThemeInitialState {
  theme: string;
  changeTheme: (theme: string) => void;
  getSystemTheme: () => void;
}

export const ThemeContext = createContext<IThemeInitialState>({
  theme: "dark",
  changeTheme: () => {},
  getSystemTheme: () => {},
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const theme = localStorage.getItem("theme");

      if (theme === "light" || theme === "dark") {
        return theme;
      }

      throw { message: "invalid theme" };
    } catch (e: unknown) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  });

  const changeTheme = (theme: string) => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  const getSystemTheme = () => {
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? setTheme("dark")
      : setTheme("light");
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, getSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
