import path from 'path';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	console.log('param', path);
	return <main className="h-full w-screen">{children}</main>;
}
