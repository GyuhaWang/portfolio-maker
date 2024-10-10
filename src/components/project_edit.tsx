import { Repository } from '@/@types/githubModule';
import { Language } from '@/@types/languageModule';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { languageColors } from '@/data/languageColor';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import usePortfolioStore from '@/zustand/usePortfolioStore';
import { DBProjectModule, Stack } from '@/@types/dbModule';
import { DateToInputDate } from '@/utils/format';
import defaultImage from '/public/github.svg';

const ProjectBox = ({ repo }: { repo: DBProjectModule }) => {
	const { updateProject } = usePortfolioStore();
	const [project, setProject] = useState<DBProjectModule>(repo);
	const {
		title,
		description,
		startDate,
		updateDate,
		gitUrl,
		webUrl,
		stacks,
		hide,
	} = project;
	const [isEditing, setIsEditing] = useState(false);

	const handleChange = (e: ChangeEvent<any>) => {
		const { value, name } = e.target;
		setProject((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};
	const handleClickEditing = () => {
		setIsEditing((prev) => {
			if (prev) {
				updateProject(project);
			}
			return !prev;
		});
	};
	const handleAddLanguage = (lang: Language) => {};
	const handleRemoveLanguage = (lang: Language) => {
		// const tmpLanguage = languages.filter((val) => val.name != lang.name);
		// setLanguages(tmpLanguage);
	};
	return (
		<div
			className={`flex flex-col w-full h-historyBox  border-gray-300 border-[1px] shadow-md  rounded-xl ${
				!isEditing && 'hover:bg-gray-100'
			} transition-all`}>
			<div
				style={{ position: 'relative', height: '40%' }}
				className="relative  h-[40%] w-full bg-white">
				<Image
					style={{ objectFit: 'cover' }}
					src={defaultImage}
					className={'rounded-t-lg'}
					fill={true}
					alt="project_img"
				/>
				<button
					aria-label="edit_button"
					onClick={() => handleClickEditing()}
					style={{
						position: 'absolute',
						right: '0px',
						top: '0px',
						color: 'gray',
					}}
					className=" w-fit p-2 text-xs hover:scale-95 transition-all z-20 text-gray-400">
					{isEditing ? '완료' : '수정하기'}
				</button>
			</div>
			{isEditing ? (
				<div
					style={{
						overflowY: 'auto',
						height: '60%',
						padding: '4px',
						display: 'flex',
						flexDirection: 'column',
						gap: '4px',
					}}>
					<label className="flex items-center gap-1">
						<p
							style={{ textWrap: 'nowrap', color: 'gray' }}
							className="text-xs ">
							제목
						</p>
						<input
							className="text-sm font-semibold w-full "
							value={title}
							name="title"
							onChange={handleChange}
						/>
					</label>
					<label className="flex items-center gap-1">
						<p
							style={{ textWrap: 'nowrap', color: 'gray' }}
							className="text-xs ">
							설명
						</p>
						<input
							className="text-sm font-semibold w-full"
							value={description ?? ''}
							name="description"
							onChange={handleChange}
						/>
					</label>
					<label className="flex items-center gap-1  w-full">
						<p
							style={{ textWrap: 'nowrap', color: 'gray' }}
							className="text-xs ">
							기간
						</p>
						<input
							type="date"
							className="text-sm font-semibold "
							name="startDate"
							value={
								startDate != undefined
									? DateToInputDate(new Date(startDate))
									: ''
							}
							onChange={handleChange}
						/>
						~
						<input
							type="date"
							name="updateDate"
							className="text-sm font-semibold "
							value={
								updateDate != undefined
									? DateToInputDate(new Date(updateDate))
									: ''
							}
							onChange={handleChange}
						/>
					</label>
					<label className="flex items-center gap-1">
						<p
							style={{ textWrap: 'nowrap', color: 'gray' }}
							className="text-xs ">
							git
						</p>
						<input
							className="text-sm font-semibold w-full"
							value={gitUrl ?? ''}
							name="gitUrl"
							onChange={handleChange}
						/>
					</label>
					<label className="flex items-center gap-1">
						<p
							style={{ textWrap: 'nowrap', color: 'gray' }}
							className="text-xs ">
							홈페이지
						</p>
						<input
							className="text-sm font-semibold w-full"
							value={webUrl ?? ''}
							name="webUrl"
							onChange={handleChange}
						/>
					</label>
					<div
						style={{
							display: 'flex',

							gap: '2px',
							width: '100%',
						}}>
						<div
							style={{ textWrap: 'nowrap', color: 'gray' }}
							className="text-xs ">
							언어
						</div>

						<div
							style={{
								display: 'flex',
								overflowX: 'auto',
								gap: '2px',
								width: '100%',
								padding: '4px',
							}}>
							{/* {languages.map((language, index) => (
								<button
									key={language.name}
									onClick={() => handleRemoveLanguage(language)}
									className="rounded-lg w-fit  "
									style={{
										backgroundColor: language.color,
										color: 'white',
										padding: '2px 6px',
										textWrap: 'nowrap',
										display: 'flex',
										gap: '2px',
										alignItems: 'center',
									}}>
									{language.name}
									<HighlightOffIcon fontSize="small" />
								</button>
							))} */}
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							overflowX: 'scroll',
							gap: '2px',
							width: '100%',
							padding: '4px',
						}}>
						{/* {languageColors
							.filter((val) => {
								return (
									languages.find(
										(lang) => lang.name == val.name && val.color == lang.color
									) == undefined
								);
							})
							.map((value, index) => (
								<span key={index}>
									<button
										onClick={() => handleAddLanguage(value)}
										className="rounded-lg w-fit  "
										style={{
											backgroundColor: value.color,
											color: 'white',
											padding: '2px 6px',
											textWrap: 'nowrap',
										}}>
										{value.name}
									</button>
								</span>
							))} */}
					</div>
				</div>
			) : (
				<div
					style={{ height: '60%' }}
					className="flex flex-col p-2 flex-grow  h-[60%]  justify-between ">
					<div className="flex flex-col gap-1">
						<h1 className="text-md font-semibold ">{title} </h1>
						<h1 className="text-sm font-semibold ">{description} </h1>
						<h3 className="text-xs font-bold">
							{startDate ? DateToInputDate(new Date(startDate)) : ''} ~{' '}
							{updateDate ? DateToInputDate(new Date(updateDate)) : '진행중'}
						</h3>
						<div className="flex gap-2 text-sm font-medium"></div>
						<a
							href={gitUrl}
							className="text-sm font-medium w-fit text-gray-600 underline underline-offset-1 ">
							github-url
						</a>
						{webUrl && (
							<a
								href={webUrl}
								className="text-sm font-medium w-fit   text-gray-600 underline underline-offset-1 ">
								web-site-url
							</a>
						)}
					</div>
					<div
						style={{
							width: '100%',

							display: 'flex',
							flexWrap: 'wrap',
							gap: '2px',
						}}>
						{/* {languages.map((language, index) => (
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
						))} */}
					</div>
				</div>
			)}
		</div>
	);
};

const ProjectEdit = () => {
	const { user, updateProject } = usePortfolioStore();

	const handleClickHide = (project: DBProjectModule) => {
		const tmpProject = { ...project, ['hide']: !project.hide };
		console.log('hello');
		updateProject(tmpProject);
	};

	return (
		<section className=" flex flex-col gap-8 ">
			<div className="flex flex-col text-3xl font-bold gap-2">
				<h1>projects</h1>
				<div className="w-full bg-gray-100  h-[2px]" />
			</div>
			<div className="project_grid">
				{user.portfolio?.projects?.map((project, index) => (
					<div
						key={project.id}
						style={{
							overflow: 'auto',
							opacity: project.hide ? 0.4 : 1,
							color: 'black',
						}}
						className="w-full p-2 ">
						<button
							className=" text-sm hover:scale-95 active:scale-90 transition-all"
							onClick={() => handleClickHide(project)}>
							{project.hide ? '보이기' : '숨기기'}
						</button>
						<ProjectBox
							repo={project}
							key={project.id}
						/>
					</div>
				))}
			</div>
		</section>
	);
};
export default ProjectEdit;
