import { chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useLocaleContext } from "pages/[[...slug]]";
import React from "react";
import {
  LocaleMenu,
  LocaleMenuButton,
  LocaleMenuLink,
  LocaleMenuList,
} from "./LocaleMenu";

export const GooeyMenu = chakra(() => {
  const router = useRouter();
  const value = useLocaleContext();

  return (
    <LocaleMenu>
      <LocaleMenuButton>{router.locale!.toUpperCase()}</LocaleMenuButton>
      <LocaleMenuList>
        <LocaleMenuLink
          href={router.pathname}
          index={0}
          locale={router.locale ? router.locale : " "}></LocaleMenuLink>
        {value?.map((lang, index) => {
          return (
            <LocaleMenuLink
              href={lang.path ? lang.path : " "}
              index={++index}
              key={index + 1}
              locale={lang.locale ? lang.locale : " "}></LocaleMenuLink>
          );
        })}
      </LocaleMenuList>
    </LocaleMenu>
  );
});
