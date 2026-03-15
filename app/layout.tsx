import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maria Brito | CV",
  description: "Educator, Designer, Co-founder & Tech Enthusiast based in Coimbra.",
  openGraph: {
    title: "Maria Brito | CV",
    description: "Educator, Designer, Co-founder & Tech Enthusiast based in Coimbra.",
    url: "https://mariabrito.pt",
    siteName: "Maria Brito",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Maria Brito — CV",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maria Brito | CV",
    description: "Educator, Designer, Co-founder & Tech Enthusiast based in Coimbra.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
