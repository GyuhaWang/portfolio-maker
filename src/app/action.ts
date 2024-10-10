import { DBPortFolioModule, DBUserModule } from '@/@types/dbModule';
import { GitHubUser, GitHubUserError, Repository } from '@/@types/githubModule';
import { auth } from '@/auth';

import { getSession } from 'next-auth/react';

export async function getGithubUser(
	name: string
): Promise<GitHubUser | GitHubUserError> {
	try {
		//DB에  user가 있는지 확인하고 없으면 해당 데이터를 return 하자

		const user = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/user?name=${name}`,

			{ next: { revalidate: 60 } }
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
			{ next: { revalidate: 60 } }
		);
		const repoJson = await repo.json();
		const gitRepo: Repository[] = repoJson;
		return gitRepo;
	} catch (e) {
		throw Error;
	}
}

export async function getDBUserByName(
	name: string
): Promise<DBUserModule | null> {
	try {
		const userInfo = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/db/user?name=${name}`,
			{ next: { revalidate: 1 } }
		);
		const userInfoJson = await userInfo.json();
		if (userInfoJson) {
			return userInfoJson as DBUserModule;
		} else return null;
	} catch (e) {
		throw Error;
	}
}

export async function postUserPortfolio(data: DBPortFolioModule) {
	await fetch('/api/db/portfolio', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}
