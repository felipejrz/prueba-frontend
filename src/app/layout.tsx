import React from "react";
import "./globals.css";

export const metadata = {
  title: "S2G-Energy",
  description: "Gestión de Estaciones de Carga",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
