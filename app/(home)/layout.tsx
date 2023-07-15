import LeftBar from "@/components/LeftBar";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import RightBar from "@/components/RightBar";
import AuthProvider from "@/context/authContext";
const inter = Inter({ subsets: ["latin"] });
import { cookies } from "next/headers";
import TweatsProvider from "@/context/tweatContext";
export const metadata = {
  title: "Twitter - 2.0",
  description: "Twitter - 2.0 by MSKHAN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex w-full min-h-screen`}>
        <AuthProvider>
          <TweatsProvider>
            <LeftBar />
            {children}
            <RightBar />
          </TweatsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
