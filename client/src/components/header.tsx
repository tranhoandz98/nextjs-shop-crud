"use client";

import { useAppContext } from "@/app/app-provider";
import { MenuMobileToggle } from "@/components/menu-mobile-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { routerMain } from "@/constants/router-main";
import Image from "next/image";
import Link from "next/link";
import ButtonLogout from "./button-logout";

export default function Header() {
  const { user } = useAppContext();
  return (
    <div className="border-b">
      <div className="container">
        <nav className="flex h-16 items-center ">
          <div className="items-center space-x-4 lg:space-x-6 hidden md:flex">
            <Link href={routerMain.HOME}>
              <Image src="/next.svg" alt="logo" width={50} height={50} />
            </Link>
            <Link
              href={routerMain.HOME}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Trang chủ
            </Link>
            <Link
              href={routerMain.PRODUCTS}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Sản phẩm
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <div className="items-center space-x-4 lg:space-x-6 hidden md:flex">
              {user ? (
                <>
                  <Link
                    href={routerMain.ME}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    xin chào {user.name}
                  </Link>
                  <div
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    <ButtonLogout/>
                  </div>

                </>
              ) : (
                <>
                  <Link
                    href={routerMain.LOGIN}
                    className="text-sm font-medium text-muted-foreground  transition-colors hover:text-primary"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href={routerMain.REGISTER}
                    className="text-sm font-medium text-muted-foreground  transition-colors hover:text-primary"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
            <div className="block md:hidden">
              <MenuMobileToggle />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
