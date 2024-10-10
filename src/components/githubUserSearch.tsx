import { GitHubUser, GitHubUserError } from '@/@types/githubModule';
import { redirect } from 'next/navigation';

import GitHubIcon from '@mui/icons-material/GitHub';
import {
	getDBUserByName,
	getGithubRepository,
	getGithubUser,
} from '@/app/action';

export default async function GithubUserSearch() {
	const handleSearchButton = async (e: FormData) => {
		'use server';
		let redirectUrl = '';
		try {
			const userName = e.get('userName') as string;
			const DBuser = await getDBUserByName(userName);
			if (DBuser?.portfolio) {
				redirectUrl = `http://localhost:3000/${DBuser.name}/read`;
			} else {
				await getGithubUser(userName)
					.then(async (user) => {
						if ((user as GitHubUserError).status == undefined) {
							await getGithubRepository((user as GitHubUser).repos_url)
								.then((repos) => {
									redirectUrl = `/${(user as GitHubUser).login}/read/gitUser`;
								})
								.catch((e) => (redirectUrl = '/error'));
						} else redirectUrl = '/error';
					})
					.catch(() => (redirectUrl = '/error'));
			}
		} catch (e) {
			throw Error;
		}
		redirect(redirectUrl);
	};

	return (
		<form
			action={async (e) => {
				'use server';
				await handleSearchButton(e);
			}}
			className="flex w-full items-center justify-center gap-10 py-4 px-8 rounded-full border-black border-2">
			<label>
				<input
					type="submit"
					hidden
				/>
				<button className="text-nowrap">
					<GitHubIcon fontSize="large" />
				</button>
			</label>

			<input
				placeholder="gitHub아이디를 검색해보세요!"
				name="userName"
				className="text-xl text-black outline-none w-full  "
			/>
		</form>
	);
}
