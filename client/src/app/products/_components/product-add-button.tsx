"use client";
import { Button } from "@/components/ui/button";
import { routerMain } from "@/constants/router-main";
import { checkIsAuthenticatedClient } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function ProductAddButton() {
  const isAuthenticate = checkIsAuthenticatedClient();
  if (!isAuthenticate) return null;
  return (
    <Link href={`${routerMain.PRODUCTS}${routerMain.ADD}`}>
      <Button>Thêm sản phẩm</Button>
    </Link>
  );
}
