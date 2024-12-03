"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../img/logo.svg";
import { cn } from "@/shared/lib/utils";
import { CartButton, Container, ProfileButton, SearchInput } from "./";
import { AuthModal } from "./modals/auth-modal";

type Props = {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
};

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
const [openAuthModal, setOpenAuthModal] = React.useState(false);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src={logo} alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-block">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* right-side */}
        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
