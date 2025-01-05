import type { Metadata } from 'next';
import { Nunito, Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
    display: 'swap',
    weight: ['400', '700'],
});

const nunito = Nunito({
    subsets: ['latin'],
    variable: '--font-nunito',
    display: 'swap',
    weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
    title: 'StreamTube',
    description:
        'StreamTube: Your ultimate platform for exploring and streaming movies. Access detailed information about films and actors, curate your favorite list, and enjoy an exceptional movie experience—all completely FREE!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                cz-shortcut-listen='true'
                className={`${openSans.variable} ${nunito.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
