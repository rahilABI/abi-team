import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABI Department | Showcase",
  description: "Enterprise Galaxy Project Registry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Global 3D Canvas */}
        <div id="canvas-container"></div>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
        <Script src="/scene.js?v=11" strategy="afterInteractive" />

        {/* Global Navigation */}
        <nav id="nav">
            <div className="brand text-protect" style={{ color: '#fff' }}>ABI</div>
            <div className="nav-links text-protect" style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', gap: '1.5rem' }}>
                <a href="/">Home</a>
                <a href="/projects">Projects</a>
                <a href="/query">RequestForm</a>
                <a href="/login" className="btn-primary" style={{ display: 'none' }}>Request Access</a>
            </div>
        </nav>

        <div style={{ flex: 1, position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
            {children}
        </div>

        {/* Global Footer */}
        <footer className="global-footer">
        </footer>
      </body>
    </html>
  );
}
