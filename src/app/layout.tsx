import Provider from '@/providers';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
	title: '포폴메이커',
	description:
		'개발자를 위한 자동 포트폴리오 생성 서비스, github를 연결해서 포트폴리오를 생성해보세요',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
