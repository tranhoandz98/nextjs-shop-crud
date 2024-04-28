"use client";

import * as React from "react";
import { HamburgerMenuIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routerMain } from "@/constants/router-main";
import Link from "next/link";

type MenuType = {
  label: string;
  path: routerMain;
  onClick?: () => void;
};
export function MenuMobileToggle() {
  const listMenu: MenuType[] = [
    {
      label: "Trang chủ",
      path: routerMain.HOME,
    },
    {
      label: "Đăng nhập",
      path: routerMain.LOGIN,
    },
    {
      label: "Đăng ký",
      path: routerMain.REGISTER,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] transition-all " />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {listMenu.map((menu, index) => (
          <DropdownMenuItem asChild onClick={() => menu.onClick} key={index}>
            <Link href={menu.path}>
            {menu.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
