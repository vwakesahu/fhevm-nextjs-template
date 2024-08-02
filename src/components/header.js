"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { truncateAddress } from "@/utils/truncateAddress";

const Header = () => {
  const { authenticated, logout } = usePrivy();
  const { wallets } = useWallets();
  const w0 = wallets[0];
  return (
    <div className="py-6 bg-white grid place-items-center">
      <div className="max-w-6xl w-full flex items-center justify-between px-4 md:px-0">
        <Image src={"/logo.svg"} width={125} height={36} />
        {authenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="font-bold text-lg flex items-center gap-3 text-[#727272]">
                {w0 && w0.address && truncateAddress(w0.address, 4, 2)}
                <Image src={"/drop-down.svg"} width={16} height={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
