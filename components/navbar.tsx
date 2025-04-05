"use client"
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Switch } from "@heroui/switch";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown'
import { useTheme } from "next-themes";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeSwitch } from "./theme-switch";
import { authService } from "@/lib/api/services";
import { Avatar } from "@heroui/avatar";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [isMy, setIsMy] = useState(false);
  const { t, i18n } = useTranslation();
  const user_id = localStorage.getItem('user_id') ?? null;

  const handleLanguageChange = () => {
    setIsMy(!isMy);
    i18n.changeLanguage(isMy ? "my" : "en");
  };
  const menuItems: Array<{ label: string; href: string }> = [];


  return (
    <HeroUINavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link
            href=""
            className="font-bold text-inherit"
          >
            T
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link
            href=""
            className="font-bold text-inherit"
          >
            TENNTHONE
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link aria-current="page" href={"/dashboard/profile"}>
            {t("common.profile")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={"/dashboard/wallet"}>
            {t("common.wallet")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          |
        </NavbarItem>
        <NavbarItem>
          <div className="flex items-center gap-2">
            <p className="text-sm">My</p>
            <Switch
              isSelected={isMy}
              color="primary"
              onChange={() => handleLanguageChange()}
            />
            <p className="text-sm">En</p>
          </div>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {!user_id ? (
          <NavbarItem>
            <Link href="">{t("home.login")}</Link>
          </NavbarItem>
        ) : (
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Avatar className="cursor-pointer" />
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu>
              <DropdownItem
                key="profile"
                as={Link}
                href="/dashboard/profile"
              >
                {t("common.profile")}
              </DropdownItem>
              <DropdownItem
                key="logout"
                as={Link}
                href=""
                onPress={() => authService.logout()}
              >
                {t("common.logout")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar >
  );
};
