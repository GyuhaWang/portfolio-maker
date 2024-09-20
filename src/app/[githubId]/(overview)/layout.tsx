import path from 'path';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main className="h-full w-screen">{children}</main>;
}
