'use client';
import { GitHubUser, GitHubUserError } from '@/@types/githubModule';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getGithubRepository, getGithubUser } from './action';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home() {
	const [userName, setUserName] = useState('');

	const router = useRouter();
	const handleSearchButton = async () => {
		try {
			await getGithubUser(userName)
				.then(async (user) => {
					if ((user as GitHubUserError).status == undefined) {
						await getGithubRepository((user as GitHubUser).repos_url)
							.then((repos) => {
								router.push(`/${(user as GitHubUser).login}/read`);
							})
							.catch(() => window.alert('존재하지 않는 유저입니다.'));
					} else throw Error;
				})
				.catch(() => window.alert('존재하지 않는 유저입니다.'));
		} catch (e) {
			window.alert('존재하지 않는 유저입니다.');
		}
	};

	return (
		<section className="h-screen w-screen flex flex-col ">
			<header className="flex h-header w-full bg-white z-30 px-20 py-2  items-center justify-end">
				<a href="/">
					<GitHubIcon />
				</a>
			</header>
			<div className=" flex flex-grow  items-center justify-center p-20 ">
				<form
					action={async () => {
						await handleSearchButton();
					}}
					className="flex w-full items-center justify-center gap-10 py-4 px-8 rounded-full border-black border-2">
					<label>
						<input
							type="submit"
							hidden
						/>
						<button
							className="text-nowrap"
							onClick={async () => await handleSearchButton()}>
							<GitHubIcon fontSize="large" />
						</button>
					</label>

					<input
						placeholder="gitHub아이디를 검색해보세요!"
						onChange={(e) => setUserName(e.target.value)}
						className="text-xl text-black outline-none w-full  "
					/>
				</form>
			</div>
		</section>
	);
}
