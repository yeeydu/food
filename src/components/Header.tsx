import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between pt-6 px-5">
      <div className="relative h-[80px] w-[90px]">
        <Link href={"/"}>
        <Image src="/food-logo.png" fill alt="logo" className="object-contain" />
        </Link>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
}
