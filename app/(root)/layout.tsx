import type { Metadata } from "next";
import { Header } from "@/shared/component/shared";

export const metadata: Metadata = {
  title: "Next Pizza",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        {modal}
      </body>
    </html>
  );
}
