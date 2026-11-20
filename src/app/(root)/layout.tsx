import type { ReactNode } from "react";
import "../globals.css";

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return <html lang="vi"><body>{children}</body></html>;
}
