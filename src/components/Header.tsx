import React from "react";
import Image from "next/image";
import { Button } from "@radix-ui/themes";
import { MenuIcon } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between pt-6 px-5">
      <Image src="/food-logo.png" height={30} width={90} alt="logo" />
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
