import React from "react";
import ProductAddForm from "../_components/product-add-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thêm sản phẩm",
};

export default function ProductAddPage() {
  return (
    <div className="mt-3">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight text-center">
        Thêm sản phẩm
      </h1>
      <ProductAddForm/>
    </div>
  );
}
