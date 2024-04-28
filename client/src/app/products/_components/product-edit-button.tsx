"use client";
import { Button } from "@/components/ui/button";
import { routerMain } from "@/constants/router-main";
import { checkIsAuthenticatedClient } from "@/lib/utils";
import { ProductListResType } from "@/schemaValidations/product.schema";
import Link from "next/link";
import React from "react";
import DeleteProduct from "./delete-product";

type Props = {
  product: ProductListResType["data"][0];
};

export default function ProductEditButton({ product }: Props) {
  const isAuthenticate = checkIsAuthenticatedClient();
  if (!isAuthenticate) return null;
  return (
    <div className='flex space-x-2 items-start'>
    <Link href={`${routerMain.PRODUCTS}/${product.id}${routerMain.EDIT}`}>
      <Button>Sửa</Button>
    </Link>
    <DeleteProduct product={product} />
    </div>
  );
}
