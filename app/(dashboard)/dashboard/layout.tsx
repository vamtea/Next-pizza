export const metadata = {
  title: "next.js",
  description: "Generated by next.js",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        Dashboard
        <body>{children}</body>
      </html>
    </>
  );
}
