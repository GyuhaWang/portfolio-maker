import { CarrerModule } from '@/@types/carrerModule';

const CareerRead = ({ careers }: { careers: CarrerModule[] }) => {
	return (
		<section className=" flex flex-col gap-8 ">
			<div className=" flex flex-col gap-3 ">
				<div className="flex flex-col text-3xl font-bold gap-2">
					<h1>경력</h1>
					<div className="w-full bg-gray-100  h-[2px]" />
				</div>

				{careers.map((career, index) => (
					<div
						key={index}
						className="flex justify-between items-center px-2">
						<div className="flex grow-[5]  text-lg font-semibold border-b-2 border-gray-50 py-2 ">
							{career.companyName}
						</div>
						<div className="flex grow-[1] text-nowrap font-semibold text-gray-700 justify-end gap-2">
							<div className="flex justify-start items-center text-xs sm:text-md flex-col sm:flex-row sm:gap-1 ">
								<h1>{career.enteryDate}</h1>
								<h1>~</h1>
								<h1>{career.quitDate == '' ? ' 재직중' : career.quitDate}</h1>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
export default CareerRead;
