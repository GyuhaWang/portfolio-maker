import { GitHubUser } from '@/@types/githubModule';
import { getGithubRepository, getGithubUser } from '@/app/action';
import UserInfoRead from '@/components/userInfo_read';
import CareerRead from '@/components/career_read';
import SkillRead from '@/components/skill_read';
import Repositoryread from '@/components/project_read';
import Header from '@/components/header';

export default async function Home({
	params,
}: {
	params: { githubId: string; user: string };
}) {
	const gitHunUser = await getGithubUser(params.githubId);
	const repositories = await getGithubRepository(
		(gitHunUser as GitHubUser).repos_url
	);

	return (
		<div className="flex flex-col ">
			<Header type="read" />
			<div className=" flex flex-col  gap-10 px-20 py-10">
				<UserInfoRead
					userInfo={gitHunUser as GitHubUser}
					gitUser={true}
				/>
				{/* <CareerRead careers={[]} />
				<SkillRead skills={[]} /> */}
				<Repositoryread
					repository={repositories}
					isGitUser={true}
				/>
			</div>
		</div>
	);
}
