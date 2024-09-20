'use client';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
const Header = () => {
	const pathname = usePathname();
	const pathList = pathname.split('/');
	const isRead = pathList[pathList.length - 1] == 'read';
	const headerContent = useMemo(() => {
		return isRead ? (
			<div>
				<a
					className="text-sm font-semibold"
					href={`${pathname.replace(pathList[pathList.length - 1], '/edit')}`}>
					수정하기
				</a>
			</div>
		) : (
			<div>수정중</div>
		);
	}, [isRead]);
	return (
		<header className="sticky top-0 flex h-header w-full bg-white z-30 px-20 py-2  items-center justify-end">
			{headerContent}
		</header>
	);
};
export default Header;
