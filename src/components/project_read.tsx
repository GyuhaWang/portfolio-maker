import { Repository } from '@/@types/githubModule';
import Image from 'next/image';
import defaultImage from '/public/github.svg';
const Repositoryread = ({ repository }: { repository: Repository[] }) => {
	return (
		<section className=" flex flex-col gap-8 ">
			<div className="flex flex-col text-3xl font-bold gap-2">
				<h1>projects</h1>
				<div className="w-full bg-gray-100  h-[2px]" />
			</div>
			<div className="project_grid">
				{repository?.map((repo, index) => (
					<div
						key={repo.id}
						style={{ overflow: 'auto' }}
						className="w-full p-2 ">
						<ProjectBoxRead
							repo={repo}
							key={repo.id}
						/>
					</div>
				))}
			</div>
		</section>
	);
};

const ProjectBoxRead = ({ repo }: { repo: Repository }) => {
	return (
		<div
			className={`flex flex-col w-full h-historyBox  border-gray-300 border-[1px] shadow-md  rounded-xl  hover:bg-gray-100 hover:scale-95 
			 transition-all`}>
			<div
				style={{
					position: 'relative',
					height: '40%',
				}}
				className="relative  h-[40%] w-full rounded-t-lg border-b-2 border-black ">
				<Image
					style={{ objectFit: 'contain' }}
					src={defaultImage}
					className={'rounded-t-lg'}
					fill={true}
					alt="project_img"
				/>
			</div>
			<div
				style={{ height: '60%' }}
				className="flex flex-col p-2 flex-grow  h-[60%]  justify-between ">
				<div className="flex flex-col gap-1">
					<h1 className="text-xl font-semibold ">{repo.name} </h1>
					<h1 className="text-lg font-semibold ">{repo.description} </h1>
					<h3 className="text-md font-normal">
						{repo.created_at.split('T')[0]} ~ {repo.updated_at.split('T')[0]}
					</h3>

					<a
						href={repo.html_url}
						className="text-md font-medium w-fit text-gray-600 underline underline-offset-1 ">
						github-url
					</a>
					{repo.homepage && (
						<a
							href={repo.homepage}
							className="text-md font-medium w-fit   text-gray-600 underline underline-offset-1 ">
							web-site-url
						</a>
					)}
				</div>
				{/* <div
						style={{
							width: '100%',

							display: 'flex',
							flexWrap: 'wrap',
							gap: '2px',
						}}>
						{languages.map((language, index) => (
							<div
								key={language.name}
								className="rounded-lg w-fit  "
								style={{
									backgroundColor: language.color,
									color: 'white',
									padding: '2px 6px',
									textWrap: 'nowrap',
									alignItems: 'center',
								}}>
								{language.name}
							</div>
						))}
					</div> */}
			</div>
		</div>
	);
};

export default Repositoryread;
