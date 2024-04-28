import LoginForm from "@/app/(auth)/login/login-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Đăng nhập'
}

export default function LoginPage() {
  return (
    <div className="mt-3">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight text-center">
        Đăng nhập
      </h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
