import prisma from '@/prisma';

import { NextResponse, NextRequest } from 'next/server';
const client = prisma;
export async function GET(req: NextRequest, res: NextResponse) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const userName = searchParams.get('name');

		const user = await client.user.findFirst({
			where: { name: userName },
			include: {
				portfolio: {
					include: {
						introduce: true,
						urls: true,
						skills: true,
						projects: true,
						careers: true,
					},
				},
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ error: '데이터를 불러오는데 오류가 발생하였습니다.' },
			{ status: 500 }
		);
	}
}
