import GithubUserSearch from '@/components/githubUserSearch';
import UserButton from '@/components/userButton';
import { Suspense } from 'react';

export default async function Home() {
	return (
		<section className="h-screen w-screen flex flex-col ">
			<header className="flex h-header w-full bg-white z-30 px-20 py-2  items-center justify-end">
				<UserButton />
			</header>
			<div className=" flex flex-grow  items-center justify-center p-20 ">
				<Suspense fallback={<div>검색중</div>}>
					<GithubUserSearch />
				</Suspense>
			</div>
		</section>
	);
}
