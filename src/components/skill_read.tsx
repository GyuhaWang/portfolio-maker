import { SkillModule } from '@/@types/skillModule';

const SkillRead = ({ skills }: { skills: SkillModule[] }) => {
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
				</div>
			))}
		</section>
	);
};
export default SkillRead;
