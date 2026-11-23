'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Check if we're on auth pages (login/register)
  const isAuthPage = pathname?.startsWith('/auth/');

  // Pages where we have manually implemented the header/layout
  // and do NOT want the global Navigation bar to appear.
  const customHeaderPages = [
    '/landing',
    '/my-government',
    '/services',
    '/topics',
    '/people-groups',
    '/contact',
    '/about',
    '/upload',
    '/ai-verification',
    '/admin',
    '/projects',
    '/unauthorized'
  ];

  const hasCustomHeader = customHeaderPages.some(path => pathname?.startsWith(path)) || pathname === '/';

  // If on auth page or a page with a custom header, render children directly
  if (isAuthPage || hasCustomHeader) {
    return <main>{children}</main>;
  }

  // For other pages, render with container, navigation, and footer
  return (
    <div className="container">
      <Navigation />
      <main>{children}</main>

      <footer style={{
        marginTop: 28,
        textAlign: 'center',
        color: '#5f7c6b',
        padding: '16px 0',
        borderTop: '1px solid rgba(22, 163, 74, 0.1)',
        fontSize: '13px'
      }}>
        🌿 © NCCR · Blockchain BlueCarbon MRV Demo — Powered by Green Technology
      </footer>
    </div>
  );
}

