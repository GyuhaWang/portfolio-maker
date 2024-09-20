'use client';

import UserInfo from '@/components/userInfo_edit';
import CareerEdit from '@/components/career_edit';
import SkillEdit from '@/components/skill_edit';
import ProjectEdit from '@/components/project_edit';

export default function Home() {
	return (
		<div className="flex flex-col  gap-10 px-20">
			<UserInfo />
			<CareerEdit />
			<SkillEdit />
			<ProjectEdit />
		</div>
	);
}
