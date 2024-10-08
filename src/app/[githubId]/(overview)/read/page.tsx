import { GitHubUser } from '@/@types/githubModule';
import {
	getDBUserByName,
	getGithubRepository,
	getGithubUser,
} from '@/app/action';
import UserInfoRead from '@/components/userInfo_read';
import CareerRead from '@/components/career_read';
import SkillRead from '@/components/skill_read';
import Repositoryread from '@/components/project_read';
import Header from '@/components/header';
import { DBUserModule } from '@/@types/dbModule';

export default async function Home({
	params,
}: {
	params: { githubId: string };
}) {
	const dbuser = await getDBUserByName(params.githubId);
	console.log(dbuser);
	return (
		<div className="flex flex-col ">
			<Header type="read" />
			<div className=" flex flex-col  gap-10 px-20 py-10">
				<UserInfoRead
					userInfo={dbuser as DBUserModule}
					gitUser={false}
				/>
				<CareerRead careers={[]} />
				<SkillRead skills={[]} />
				<Repositoryread
					repository={dbuser?.portfolio?.projects ?? []}
					isGitUser={false}
				/>
			</div>
		</div>
	);
}
