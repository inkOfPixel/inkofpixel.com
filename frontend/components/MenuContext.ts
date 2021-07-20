import * as React from "react";

export interface MenuContext {
  isOpen: boolean;
  toggle(): void;
}

export const MenuContext = React.createContext<MenuContext | null>(null);

export function useMenuContext() {
  const value = React.useContext(MenuContext);
  if (value == null) {
    throw new Error("Can't use useMenuContext without a LocaleMenu");
  }
  return value;
}
