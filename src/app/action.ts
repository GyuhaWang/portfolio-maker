import { GitHubUser, GitHubUserError, Repository } from '@/@types/githubModule';

export async function getGithubUser(
	name: string
): Promise<GitHubUser | GitHubUserError> {
	try {
		const user = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/user?name=${name}`,
			{
				cache: 'force-cache',
			}
		);
		const userJson = await user.json();

		if (userJson.status == '404') {
			return userJson as GitHubUserError;
		}
		const gitUser: GitHubUser = userJson;
		return gitUser;
	} catch (e) {
		throw Error;
	}
}
export async function getGithubRepository(url: string): Promise<Repository[]> {
	try {
		const repo = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/repository?url=${url}`,
			{ cache: 'force-cache' }
		);
		const repoJson = await repo.json();
		const gitRepo: Repository[] = repoJson;
		return gitRepo;
	} catch (e) {
		throw Error;
	}
}
