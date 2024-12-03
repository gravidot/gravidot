import type { Metadata } from "next";
import React from "react";
import "../src/shared/styles/globals.css";

export const metadata: Metadata = {
  title: "Gravidot: A brainstorming tool with multi-touch 🗯️✌️",
  description:
    "A brainstorming and mind mapping service that connects ideas and supports real-time collaboration with an intuitive multi-touch interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
