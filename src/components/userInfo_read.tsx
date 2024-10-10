import { GitHubUser } from '@/@types/githubModule';

import defaultImage from '/public/github.svg';
import Image from 'next/image';
import { DBUserModule } from '@/@types/dbModule';
import { useMemo } from 'react';

const UserInfoRead = ({
	userInfo,
	gitUser,
}: {
	userInfo: GitHubUser | DBUserModule;
	gitUser: boolean;
}) => {
	const gitUserInfo = useMemo(() => {
		const user = userInfo as GitHubUser;
		return (
			<>
				<div className="relative h-28 w-28 rounded-full">
					<Image
						style={{ objectFit: 'cover', borderRadius: '100%' }}
						src={user?.avatar_url ?? defaultImage}
						className={'rounded-t-lg'}
						fill={true}
						alt="face"
					/>
				</div>
				<div className="flex font-bold text-3xl gap-4">
					<h1>{userInfo?.name ?? 'N/A'}</h1>
					<div className="w-1 bg-black my-1" />
					<h2>Portfolio</h2>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 w-full">
					{!gitUser && (
						<div className="flex grow-[3]  border-gray-300 border-[1px] rounded-lg p-3" />
					)}

					<div className="flex grow-[1] gap-2 flex-col items-start">
						<div className="flex flex-col w-full text-sm text-blue-600 underline">
							{user?.email && (
								<a
									className="hover:scale-95 active:scale-90 transition-all"
									href={user?.email}>
									email
								</a>
							)}
							{user?.name && (
								<a
									className="hover:scale-95 active:scale-90 transition-all"
									href={`https://github.com/${user?.login}`}>
									GITHUB
								</a>
							)}
							{user?.blog && (
								<a
									className="hover:scale-95 active:scale-90 transition-all"
									href={user?.blog}>
									blog
								</a>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}, [userInfo]);
	const DBUserInfo = useMemo(() => {
		const user = userInfo as DBUserModule;
		return (
			<>
				<div className="relative h-28 w-28 rounded-full">
					<Image
						style={{ objectFit: 'cover', borderRadius: '100%' }}
						src={user?.image ?? defaultImage}
						className={'rounded-t-lg'}
						fill={true}
						alt="face"
					/>
				</div>
				<div className="flex font-bold text-3xl gap-4">
					<h1>{userInfo?.name ?? 'N/A'}</h1>
					<div className="w-1 bg-black my-1" />
					<h2>Portfolio</h2>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 w-full">
					{!gitUser && (
						<div className="flex grow-[3]  border-gray-300 border-[1px] rounded-lg p-3">
							{user.portfolio?.introduce?.introduce}
						</div>
					)}

					<div className="flex grow-[1] gap-2 flex-col items-start">
						<div className="flex flex-col w-full text-sm text-blue-600 underline">
							{/* {userInfo?.email && (
							<a
								className="hover:scale-95 active:scale-90 transition-all"
								href={userInfo?.email}>
								email
							</a>
						)}
						{user?.name && (
							<a
								className="hover:scale-95 active:scale-90 transition-all"
								href={`https://github.com/${userInfo?.login}`}>
								GITHUB
							</a>
						)}
						{user?.blog && (
							<a
								className="hover:scale-95 active:scale-90 transition-all"
								href={userInfo?.blog}>
								blog
							</a>
						)} */}
							{user.portfolio?.urls?.map((url, index) => (
								<div
									className="flex w-full justify-between"
									key={index}>
									<a
										className=" max-w-32 overflow-hidden text-ellipsis hover:scale-95 active:scale-90 transition-all"
										href={url.url}>
										{url.url}
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			</>
		);
	}, [userInfo]);
	return (
		<section className="flex flex-col gap-4">
			{gitUser ? gitUserInfo : DBUserInfo}
		</section>
	);
};

export default UserInfoRead;
