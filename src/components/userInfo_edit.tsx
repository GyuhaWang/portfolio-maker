'use client';

import { GitHubUser } from '@/@types/githubModule';

import defaultImage from '/public/github.svg';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const UserInfo = () => {
	const [userInfo, setUserInfo] = useState<GitHubUser>();
	const [introduce, setIntroduce] = useState();
	const [urls, setUrls] = useState<string[]>([]);
	const [url, setUrl] = useState<string>();

	const handleChange = (setter: any) => (e: ChangeEvent<any>) => {
		setter(e.target.value);
	};

	const handleAddUrl = () => {
		if (url) {
			setUrls((prev) => [...prev, url]);
		}
		setUrl('');
	};
	const handleRemoveUrl = (url: string) => {
		const tmp = urls.filter((val) => val != url);
		setUrls(tmp);
	};

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
				<textarea
					placeholder="성장하는 개발자 홍길동입니다."
					onChange={handleChange(setIntroduce)}
					className="flex grow-[3]  border-gray-300 border-[1px] rounded-lg p-3"
					value={introduce}
				/>

				<div className="flex grow-[1] gap-2 flex-col items-start">
					<form
						action={() => handleAddUrl()}
						className=" flex w-full ">
						<input
							onChange={handleChange(setUrl)}
							value={url}
							className="flex  border-b-2 "
							placeholder="www.blog.com"
						/>
						<label>
							<input
								hidden
								type="submit"
							/>
							<button
								onClick={() => handleAddUrl()}
								className="text-xs text-nowrap text-gray-600 w-fit">
								추가
							</button>
						</label>
					</form>
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
						{urls.map((url, index) => (
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
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserInfo;
