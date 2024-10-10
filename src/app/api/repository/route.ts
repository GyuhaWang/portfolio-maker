import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const url = searchParams.get('url');
		const res = await fetch(url ?? '', { next: { revalidate: 60 } });

		return NextResponse.json(await res.json());
	} catch (error) {
		return NextResponse.json(
			{ error: '데이터를 불러오는데 오류가 발생하였습니다.' },
			{ status: 500 }
		);
	}
}
