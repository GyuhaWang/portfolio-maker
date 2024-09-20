import { SkillModule } from '@/@types/skillModule';
import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const SkillEdit = () => {
	const [skills, setSkills] = useState<SkillModule[]>([]);
	const [skill, setSkill] = useState<SkillModule>({ type: '', constents: '' });

	const handelAddSkillType = (val: string) => {
		setSkill((prev) => {
			return { ...prev, ['type']: val };
		});
	};
	const handelAddSkillContents = (val: string) => {
		setSkill((prev) => {
			return { ...prev, ['constents']: val };
		});
	};

	const handelAddSkills = () => {
		if (skill.type != '' && skill.constents != '') {
			setSkills((prev) => [...prev, skill]);
			setSkill({ type: '', constents: '' });
		}
	};
	const handelRemoveSkills = (target: SkillModule) => {
		const tmpSkills = skills.filter((val) => val != target);
		setSkills(tmpSkills);
	};

	return (
		<section className=" flex flex-col gap-6 ">
			<div className="flex flex-col text-3xl font-bold gap-2">
				<h1>기술 스택</h1>
				<div className="w-full bg-gray-100  h-[2px]" />
			</div>
			{skills.map((skill, index) => (
				<div
					key={index}
					className="flex justify-between">
					<div className="flex grow-[1] text-md font-semibold">
						{skill.type}
					</div>
					<div className="flex grow-[1] text-md font-medium">
						{skill.constents}
					</div>
					<button
						className="hover:scale-95 active:scale-90 transition-all"
						onClick={() => handelRemoveSkills(skill)}>
						<HighlightOffIcon fontSize="small" />
					</button>
				</div>
			))}

			<form
				action={() => handelAddSkills()}
				className="flex flex-col sm:flex-row gap-3 sm:gap-10 justify-between items-center ">
				<input
					value={skill.type}
					onChange={(e) => handelAddSkillType(e.target.value)}
					className="w-full p-4 border-b border-gray-600"
					placeholder="FRONT-END"
				/>
				<input
					value={skill.constents}
					onChange={(e) => handelAddSkillContents(e.target.value)}
					className="w-full p-4 border-b border-gray-600"
					placeholder="HTML,CSS,JAVASCRIPT,TYPESCRIPT"
				/>

				<label>
					<input
						hidden
						type="submit"
					/>
					<button
						onClick={() => handelAddSkills()}
						className="text-nowrap hover:scale-95 active:scale-90 transition-all text-sm text-gray-700">
						추가
					</button>
				</label>
			</form>
		</section>
	);
};
export default SkillEdit;
