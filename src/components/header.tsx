'use client';
import { usePathname } from 'next/navigation';
import { ReactElement, useMemo } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useSession } from 'next-auth/react';
import { SignIn } from './auth_component';
import { Session } from 'next-auth';

export type HeaderType = 'read' | 'edit';

const Header = ({ type }: { type: HeaderType }) => {
	const session = useSession();
	const pathname = usePathname();

	const isRead = type == 'read';

	const headerContent = useMemo(() => {
		return headerLogic(session.data, pathname, type);
		// isRead ? (
		// 	session.data?.user.name == userName ? (
		// 		<div>
		// 			<a
		// 				className="text-sm font-semibold"
		// 				href={`http://localhost:3000/${userName}
		// 					/edit
		// 				`}>
		// 				수정하기
		// 			</a>
		// 		</div>
		// 	) : session.data ? null : (
		// 		<div>로그인</div>
		// 	)
		// ) : (
		// 	<div>수정중</div>
		// );
	}, [isRead, session.data]);
	function headerLogic(
		userData: Session | null,
		path: string,
		pageType: HeaderType
	): ReactElement {
		const pathList = path.split('/');
		const userName = pathList[1];

		if (pageType == 'read') {
			if (userData != null) {
				if (userData!.user.name == userName) {
					return (
						<div>
							<a
								className="text-sm font-semibold"
								href={getEditPath(path)}>
								수정하기
							</a>
						</div>
					);
				} else {
					return <></>;
				}
			} else {
				return <div>로그인</div>;
			}
		} else {
			return <div>수정중</div>;
		}
		//read page? ->
		// 유저가 로그인 중인가?
		// 내 페이지를 보고 있는가? -> 수정하기
		// 남의 페이지를 보고 있는가? -> null

		// 유저가 로그인 안됨 -> 로그인 띄운다.

		//!read page? -> 수정중
	}
	function getEditPath(path: string): string {
		let lastReadIndex = path.lastIndexOf('/read');

		if (lastReadIndex !== -1) {
			let newUrl =
				path.slice(0, lastReadIndex) + '/edit' + path.slice(lastReadIndex + 5);
			return newUrl;
		}
		return '/';
	}
	return (
		<header className="sticky top-0 flex h-header w-full bg-white z-30 px-20 py-2  items-center justify-between border-b-gray-600 border-b-[1px]">
			<a href="/">
				<HomeIcon />
			</a>
			{headerContent}
		</header>
	);
};
export default Header;
