import "@/app/globals.css";
import AuthProvider from "@/context/authContext";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter-2.0 | Registeration",
  description:
    "Twitter-2.0 by MSKHAN | Create new twitter-2.0 account and explore the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full min-h-screen`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
