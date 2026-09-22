import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Studio · Taqwa Agency",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function ResourcesAdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
