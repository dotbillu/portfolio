import "./globals.css";
import { FullScreenProvider } from "../context/FullScreenContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0 p-0 bg-[#FFF1EB]">
        <FullScreenProvider>{children}</FullScreenProvider>
      </body>
    </html>
  );
}
