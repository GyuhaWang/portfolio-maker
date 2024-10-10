'use client';

import UserInfo from '@/components/userInfo_edit';
import CareerEdit from '@/components/career_edit';
import SkillEdit from '@/components/skill_edit';
import ProjectEdit from '@/components/project_edit';
import usePortfolioStore from '@/zustand/usePortfolioStore';
import { useEffect } from 'react';
import {
	getGithubRepository,
	getGithubUser,
	postUserPortfolio,
} from '@/app/action';
import { DBProjectModule, DBUserModule } from '@/@types/dbModule';
import { GitHubUser, GitHubUserError } from '@/@types/githubModule';
import { v4 as uuidv4 } from 'uuid';

export default function Home({ params }: { params: { githubId: string } }) {
	const { setInitialUser, user } = usePortfolioStore();

	useEffect(() => {
		const userInfo: DBUserModule = {};
		const getUserInfo = async () => {
			await getGithubUser(params.githubId).then(async (user) => {
				if ((user as GitHubUserError).status == undefined) {
					const userData = user as GitHubUser;
					userInfo.name = userData.name ?? undefined;
					userInfo.image = userData.avatar_url;

					await getGithubRepository((user as GitHubUser).repos_url).then(
						(repos) => {
							userInfo.portfolio = { projects: [], urls: [] };
							userData.email &&
								userInfo.portfolio?.urls?.push({
									id: uuidv4(),
									url: userData?.email!,
									displayName: 'email',
								});
							userData.blog &&
								userInfo.portfolio?.urls?.push({
									id: uuidv4(),
									url: userData?.blog!,
									displayName: 'blog',
								});
							userData.login &&
								userInfo.portfolio?.urls?.push({
									id: uuidv4(),
									url: `https://github.com/${userData?.login}`,
									displayName: 'git',
								});
							repos.map((repo) => {
								//
								let project: DBProjectModule = {
									id: uuidv4(),
									title: repo.name,
									description: repo.description ?? undefined,
									startDate: new Date(repo.created_at),
									updateDate: new Date(repo.updated_at),
									gitUrl: repo.git_url,
									webUrl: repo.homepage,
								};
								userInfo.portfolio?.projects?.push(project);
							});
						}
					);
				}
			});

			setInitialUser(userInfo);
		};
		getUserInfo();
	}, [params.githubId]);
	const handleClickSaveButton = async () => {
		if (user.portfolio) await postUserPortfolio(user.portfolio);
	};
	return (
		<div className="flex flex-col  gap-10 px-20">
			<button onClick={async () => await handleClickSaveButton()}>저장</button>
			<UserInfo />
			<CareerEdit />
			<SkillEdit />
			<ProjectEdit />
		</div>
	);
}
