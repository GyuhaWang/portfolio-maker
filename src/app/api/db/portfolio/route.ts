import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import prisma from '@/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import console, { error } from 'console';
import {
	DBCareerModule,
	DBIntroduceModule,
	DBProjectModule,
	DBSkillModule,
	DBUrlModule,
} from '@/@types/dbModule';
const client = prisma;
const secret = process.env.AUTH_SECRET;

async function postIntroduce(
	introduce: DBIntroduceModule | null,
	portfolioId: string
) {
	if (introduce)
		return client.introduce.create({
			data: {
				portFolio: { connect: { id: portfolioId } },
				introduce: introduce.introduce ?? '',
			},
		});
}
async function postProjects(
	projects: DBProjectModule[] | null,
	portfolioId: string
) {
	if (projects)
		return projects.forEach((target, index) =>
			client.project.create({
				data: {
					title: target.title ?? '',
					description: target.description ?? '',
					startDate: target.startDate ?? '',
					updateDate: target.updateDate ?? '',
					gitUrl: target.gitUrl ?? '',
					portFolio: {
						connect: {
							id: portfolioId,
						},
					},
				},
			})
		);
}
export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const session = await auth();
		if (!session) {
			return NextResponse.json(
				{ error: '로그인이 필요합니다.' },
				{ status: 500 }
			);
		}

		// session table 에서 확인하자 있으면 user 접근 허용
		const user = await client.session.findFirst({
			where: { sessionToken: session.sessionToken },
			include: { user: true },
		});
		if (user) {
			const expireDate = new Date(user?.expires);
			const now = new Date();
			const expired = expireDate < now;
			if (!expired) {
				const data = await req.json();
				const introduce = data.introduce
					? (data.introduce as DBIntroduceModule)
					: null;
				const urls = data.urls ? (data.urls as DBUrlModule[]) : null;
				const careers = data.careers
					? (data.careers as DBCareerModule[])
					: null;
				const skills = data.skills ? (data.skills as DBSkillModule[]) : null;
				const projects = data.projects
					? (data.projects as DBProjectModule[])
					: null;

				await client.$transaction(async (prisma) => {
					const portfolio = await prisma.portfolio.create({
						data: {
							user: { connect: { id: user.user.id } },
						},
					});
					console.log(portfolio);
					const postIntroduce = await prisma.introduce.create({
						data: {
							portFolio: { connect: { id: portfolio.id } }, // portfolio와 연결
							introduce: introduce?.introduce ?? '',
						},
					});
					console.log(postIntroduce);

					if (projects && projects.length > 0) {
						for (const project of projects) {
							await prisma.project.create({
								data: {
									title: project.title ?? '',
									description: project.description ?? '',
									startDate: project.startDate ?? '',
									updateDate: project.updateDate ?? '',
									gitUrl: project.gitUrl ?? '',
									portFolio: { connect: { id: portfolio.id } }, // portfolio와 연결
								},
							});
						}
					}

					// projects 추가
				});
			}
		}

		return NextResponse.json(
			{ message: '포트폴리오 저장을 성공하였습니다.' },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: '데이터를 불러오는데 오류가 발생하였습니다.' },
			{ status: 500 }
		);
	}
}
