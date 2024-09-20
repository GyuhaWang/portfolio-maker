import { GitHubUser } from '@/@types/githubModule';

import defaultImage from '/public/github.svg';
import Image from 'next/image';

const UserInfoRead = ({ userInfo }: { userInfo: GitHubUser }) => {
	return (
		<section className="flex flex-col gap-4">
			<div className="relative h-28 w-28 rounded-full">
				<Image
					style={{ objectFit: 'cover', borderRadius: '100%' }}
					src={userInfo?.avatar_url ?? defaultImage}
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
				<div className="flex grow-[3]  border-gray-300 border-[1px] rounded-lg p-3" />

				<div className="flex grow-[1] gap-2 flex-col items-start">
					<div className="flex flex-col w-full text-sm text-blue-600 underline">
						{userInfo?.email && (
							<a
								className="hover:scale-95 active:scale-90 transition-all"
								href={userInfo?.email}>
								email
							</a>
						)}
						{userInfo?.login && (
							<a
								className="hover:scale-95 active:scale-90 transition-all"
								href={`https://github.com/${userInfo?.login}`}>
								GITHUB
							</a>
						)}
						{userInfo?.blog && (
							<a
								className="hover:scale-95 active:scale-90 transition-all"
								href={userInfo?.blog}>
								blog
							</a>
						)}
						{/* {urls.map((url, index) => (
							<div
								className="flex w-full justify-between"
								key={index}>
								<a
									className=" max-w-32 overflow-hidden text-ellipsis hover:scale-95 active:scale-90 transition-all"
									href={url}>
									{url}
								</a>
								<button
									className="hover:scale-95 active:scale-90 transition-all"
									onClick={() => handleRemoveUrl(url)}>
									<HighlightOffIcon
										fontSize="small"
										color="info"
									/>
								</button>
							</div>
						))} */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserInfoRead;
