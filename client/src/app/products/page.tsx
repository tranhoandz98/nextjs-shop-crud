import productApiRequest from "@/apiRequests/product";
import { routerMain } from "@/constants/router-main";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductAddButton from "./_components/product-add-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductEditButton from "./_components/product-edit-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm",
  description: "Danh sách sản phẩm của Productic, được tạo bởi Hoantv",
};

export default async function ProductListPage() {
  const { payload } = await productApiRequest.getList();
  const productList = payload.data;

  return (
    <div className="space-y-3 mt-3">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Danh sách sản phẩm
        </h1>
        <ProductAddButton />
      </div>
      <div className="grid grid-cols-12 gap-4">
        {productList.map((product) => (
          <Card
            key={product.id}
            className="col-span-12 md:col-span-6 lg:col-span-4 hover:bg-secondary"
          >
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`${routerMain.PRODUCTS}/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-32 h-32 object-cover"
                />
              </Link>
            </CardContent>
            <CardFooter>
              <ProductEditButton product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
