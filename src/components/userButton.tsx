import { auth } from '@/auth';
import { SignIn, SignOut } from './auth_component';

export default async function UserButton() {
	const session = await auth();
	if (!session?.user) return <SignIn />;
	return (
		<div className="flex ">
			<SignOut /> 로그아웃
		</div>
	);
}
