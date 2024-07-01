"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className=" w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.png"
            alt="hamburger icon"
            width={30}
            height={30}
            className=" cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className=" border-none bg-dark-1">
          <Link href={"/"} className="flex items-center gap-1">
            <Image
              src={"/images/logo.png"}
              width={32}
              height={32}
              alt="Room tv logo"
              className=" max-sm:size-10"
            />
            <p className=" text-[22px] font-extrabold text-white">Room TV</p>
          </Link>

          <div className=" flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-6 pt-16 text-white">
                {sideBarLinks.map((link) => {
                  const isActive = pathname === link.route;
                  return (
                    <>
                      <SheetClose asChild key={link.title}>
                        <Link
                          href={link.route}
                          className={cn(
                            "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                            {
                              "bg-blue-1": isActive,
                            }
                          )}
                        >
                          <Image
                            src={link.imgUrl}
                            alt={link.title}
                            width={20}
                            height={20}
                          />
                          <p className=" font-semibold">{link.title}</p>
                        </Link>
                      </SheetClose>
                    </>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
