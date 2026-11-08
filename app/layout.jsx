import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Get Consistent Google Reviews & Rank Higher | ReviewRise',
  description: 'Get more Google reviews and rank higher in local search. Google review management software we set up in 15 minutes and run for you. Start 7 days free.',
  openGraph: {
    title: 'Get Consistent Google Reviews & Rank Higher | ReviewRise',
    description: 'Get more Google reviews and rank higher in local search. Google review management software we set up in 15 minutes and run for you. Start 7 days free.',
    siteName: 'ReviewRise',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
