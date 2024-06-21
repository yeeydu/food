"use client";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export default function Header() {
  const { data, status } = useSession(); // authProvider context

  const handleSignIn = () => signIn();
  const handleSignOut = () => signOut();

  return (
    <div className="flex justify-between pt-6 px-5">
      <div className="relative h-[80px] w-[90px]">
        <Link href={"/"}>
          <Image
            src="/food-logo.png"
            fill
            alt="logo"
            className="object-contain"
          />
        </Link>
      </div>
      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent> 
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          {status === "authenticated" ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3 ">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold"> {data?.user?.name} </h3>
                    <span className="block text-muted-foreground text-xs">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>

                <Button size="icon" onClick={handleSignOut}>
                  <LogOutIcon size={20} />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center pt-10">
              <h2 className="font-semibold">Please Sign In</h2>
              <Button size="icon" onClick={handleSignIn}>
                <LogInIcon size={20} />
              </Button>
            </div>
          )}
          <div className="py-6">
            <Separator />
          </div>
          <div>
            <Button
              variant="ghost"
              className="space-x-3 w-full justify-start text-sm font-normal rounded-full"
            >
              <HomeIcon size={16} /> <span className="block">Home</span>
            </Button>
          </div>
          {data?.user && (
            <>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="space-x-3 w-full justify-start text-sm font-normal rounded-full"
                >
                  <ScrollTextIcon size={16} />{" "}
                  <span className="block">Orders</span>
                </Button>
                <Button
                  variant="ghost"
                  className="space-x-3 w-full justify-start text-sm font-normal rounded-full"
                >
                  <HeartIcon size={16} />{" "}
                  <span className="block">Favorite Restaurants</span>
                </Button>
              </div>
              <div className="py-6">
                <Separator />
              </div>

              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="space-x-3 w-full justify-start text-sm font-normal rounded-full"
              >
                <LogOutIcon size={16} /> <span className="block">Log out</span>
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
