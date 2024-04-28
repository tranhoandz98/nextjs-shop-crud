import { ModeToggle } from "@/components/mode-toggle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Trang chủ'
}
export default function HomePage() {
  return (
    <div className="mt-3">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Trang chủ</h1>
    </div>
  );
}
