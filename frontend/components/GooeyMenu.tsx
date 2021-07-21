import { chakra } from "@chakra-ui/react";
import { LocalizationsData } from "@features/plugins/useSitePlugin";
import { useRouter } from "next/router";
import React from "react";
import {
  LocaleMenu,
  LocaleMenuButton,
  LocaleMenuLink,
  LocaleMenuList,
} from "./LocaleMenu";

export interface GooeyMenuProps {
  locales: Nullable<LocalizationsData[]>;
}

export const GooeyMenu = chakra(({ locales }: GooeyMenuProps) => {
  const router = useRouter();

  return (
    <LocaleMenu>
      <LocaleMenuButton>{router.locale!.toUpperCase()}</LocaleMenuButton>
      <LocaleMenuList>
        <LocaleMenuLink href={router.pathname} locale={router.locale!}>
          {router.locale?.toUpperCase()}
        </LocaleMenuLink>
        {locales?.map((pageLocale) => {
          return (
            <LocaleMenuLink
              key={pageLocale.locale}
              href={pageLocale.path!}
              locale={pageLocale.locale!}>
              {pageLocale.locale?.toUpperCase()}
            </LocaleMenuLink>
          );
        })}
      </LocaleMenuList>
    </LocaleMenu>
  );
});
