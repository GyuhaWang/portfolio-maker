'use client';

import UserInfo from '@/components/userInfo_edit';
import CareerEdit from '@/components/career_edit';
import SkillEdit from '@/components/skill_edit';
import ProjectEdit from '@/components/project_edit';
import { DBUserModule } from '@/@types/dbModule';
import { useEffect, useState } from 'react';
import { getDBUserByName } from '@/app/action';
import usePortfolioStore from '@/zustand/usePortfolioStore';

//DB userEdit
export default function Home({ params }: { params: { githubId: string } }) {
	// 정보 가져오기
	const { setInitialUser } = usePortfolioStore();

	useEffect(() => {
		const getUserInfo = async () => {
			const res = await getDBUserByName(params.githubId);
			if (res) {
				console.log('res', res);
				setInitialUser(res);
			}
		};
		getUserInfo();
	}, [params.githubId]);
	return (
		<div className="flex flex-col  gap-10 px-20">
			<UserInfo />
			<CareerEdit />
			<SkillEdit />
			<ProjectEdit />
		</div>
	);
}
