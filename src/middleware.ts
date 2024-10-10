export { auth as middleware } from './auth';

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export const runtime = 'experimental-edge';

// auth 로 middleware 제어 필요한 페이지
// 1 edit page -> 만약 DB user 라면 -> 막아야함 , 아니라면 안막아도됨
// 2 api 저장하기 -> 만약 DB user 라면 나만 수정 가능
