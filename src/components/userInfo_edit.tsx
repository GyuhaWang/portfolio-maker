'use client';

import defaultImage from '/public/github.svg';
import Image from 'next/image';
import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DBUrlModule } from '@/@types/dbModule';
import { v4 as uuidv4 } from 'uuid';
import usePortfolioStore from '@/zustand/usePortfolioStore';
const ProfileImg = ({ imgUrl }: { imgUrl?: string }) => {
	return (
		<div className="relative h-28 w-28 rounded-full">
			<Image
				style={{ objectFit: 'cover', borderRadius: '100%' }}
				src={imgUrl ?? defaultImage}
				className={'rounded-t-lg'}
				fill={true}
				alt="face"
			/>
		</div>
	);
};
const ProfileName = ({ name }: { name?: string }) => {
	return (
		<div className="flex font-bold text-3xl gap-4">
			<h1>{name ?? '-'}</h1>
			<div className="w-1 bg-black my-1" />
			<h2>Portfolio</h2>
		</div>
	);
};

const ProfileIntroduce = ({
	introduce,
	handleChange,
}: {
	introduce: string;
	handleChange: (e: string) => void;
}) => {
	return (
		<textarea
			placeholder="성장하는 개발자 홍길동입니다."
			onChange={(e) => handleChange(e.target.value)}
			className="flex grow-[3]  border-gray-300 border-[1px] rounded-lg p-3"
			value={introduce}
		/>
	);
};

const ProfileUrls = ({
	urls,
	url,
	addUrl,
	handleChange,
	removeUrl,
}: {
	urls: DBUrlModule[];
	url: DBUrlModule;
	addUrl: (url: DBUrlModule) => void;
	handleChange: (e: string) => void;
	removeUrl: (id: string) => void;
}) => {
	return (
		<div className="flex grow-[1] gap-2 flex-col items-start">
			<form
				action={() => {
					addUrl(url), handleChange('');
				}}
				className=" flex w-full ">
				<input
					onChange={(e) => handleChange(e.target.value)}
					value={url.url}
					className="flex  border-b-2 "
					placeholder="www.blog.com"
				/>
				<label>
					<input
						hidden
						type="submit"
					/>
					<button
						onClick={(e) => {
							e.preventDefault();
							addUrl(url), handleChange('');
						}}
						className="text-xs text-nowrap text-gray-600 w-fit">
						추가
					</button>
				</label>
			</form>

			{urls.map((url, index) => (
				<div
					className="flex w-full justify-between"
					key={index}>
					<a
						className="  overflow-hidden text-ellipsis hover:scale-95 active:scale-90 transition-all"
						href={url.url}>
						{url.url}
					</a>
					<button
						className="hover:scale-95 active:scale-90 transition-all"
						onClick={() => removeUrl(url.id ?? '')}>
						<HighlightOffIcon
							fontSize="small"
							color="info"
						/>
					</button>
				</div>
			))}
		</div>
	);
};

const UserInfo = ({}: {}) => {
	const { user, addUrl, removeUrl, handleChangeIntroduce } =
		usePortfolioStore();

	const [url, setUrl] = useState<DBUrlModule>({ id: uuidv4(), url: '' });

	const handleChangeUrl = (e: string) => {
		setUrl((prev) => {
			return {
				...prev,
				['url']: e,
			};
		});
	};

	const handleAddUrl = (url: DBUrlModule) => {
		addUrl(url);
		setUrl({ id: uuidv4(), url: '' });
	};
	return (
		<section className="flex flex-col gap-4">
			<ProfileImg imgUrl={user.image} />
			<ProfileName name={user.name} />
			<div className="flex flex-col sm:flex-row gap-4 w-full">
				<ProfileIntroduce
					introduce={user.portfolio?.introduce?.introduce ?? ''}
					handleChange={handleChangeIntroduce}
				/>
				<ProfileUrls
					urls={user.portfolio?.urls ?? []}
					url={url}
					removeUrl={removeUrl}
					addUrl={handleAddUrl}
					handleChange={handleChangeUrl}
				/>
			</div>
		</section>
	);
};

export default UserInfo;
