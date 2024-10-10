import { signIn, signOut } from '@/auth';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';

export function SignIn({ provider }: { provider?: string }) {
	return (
		<form
			action={async () => {
				'use server';
				await signIn();
			}}>
			<label className="hover:scale-95 active:scale-90 transition-all">
				<input
					type="submit"
					hidden
				/>
				<GitHubIcon />
			</label>
		</form>
	);
}

export function SignOut() {
	return (
		<form
			action={async () => {
				'use server';
				await signOut();
			}}>
			<label>
				<input
					type="submit"
					hidden
				/>
				<p className="text-xs text-gray-500 text-nowrap  hover:scale-95 active:scale-90 transition-all">
					로그아웃
				</p>
			</label>
		</form>
	);
}
