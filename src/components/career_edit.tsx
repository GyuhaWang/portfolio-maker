'use client';

import { CarrerModule } from '@/@types/carrerModule';
import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const CareerEdit = () => {
	const [carrers, setCarrers] = useState<CarrerModule[]>([]);
	const [career, setCareer] = useState<CarrerModule>({
		companyName: '',
		enteryDate: '',
		quitDate: '',
	});

	const handelAddCarrer = () => {
		if (career.companyName != '' && career.enteryDate != '') {
			setCarrers((prev) => [...prev, career]);
			setCareer({
				companyName: '',
				enteryDate: '',
				quitDate: '',
			});
		}
	};
	const handleRemoveCarrer = (target: CarrerModule) => {
		const tmpCarrer = carrers.filter((val) => val != target);
		setCarrers(tmpCarrer);
	};
	const handelAddCarrerCompany = (val: string) => {
		setCareer((prev) => {
			return { ...prev, ['companyName']: val };
		});
	};
	const handelAddCarrerEntryDate = (val: string) => {
		setCareer((prev) => {
			return { ...prev, ['enteryDate']: val };
		});
	};
	const handelAddCarrerQuitDate = (val: string) => {
		setCareer((prev) => {
			return { ...prev, ['quitDate']: val };
		});
	};

	return (
		<section className=" flex flex-col gap-8 ">
			<div className=" flex flex-col gap-3 ">
				<div className="flex flex-col text-3xl font-bold gap-2">
					<h1>경력</h1>
					<div className="w-full bg-gray-100  h-[2px]" />
				</div>

				{carrers.map((carrer, index) => (
					<div
						key={index}
						className="flex justify-between items-center px-2">
						<div className="flex grow-[5]  text-lg font-semibold border-b-2 border-gray-50 py-2 ">
							{carrer.companyName}
						</div>
						<div className="flex grow-[1] text-nowrap font-semibold text-gray-700 justify-end gap-2">
							<div className="flex justify-start items-center text-xs sm:text-md flex-col sm:flex-row sm:gap-1 ">
								<h1>{carrer.enteryDate}</h1>
								<h1>~</h1>
								<h1>{carrer.quitDate == '' ? ' 재직중' : carrer.quitDate}</h1>
							</div>
							<button
								className="hover:scale-95 active:scale-90 transition-all"
								onClick={() => handleRemoveCarrer(carrer)}>
								<HighlightOffIcon fontSize="small" />
							</button>
						</div>
					</div>
				))}
			</div>
			<form
				action={() => handelAddCarrer()}
				className="flex flex-col sm:flex-row gap-3 sm:gap-10 justify-between items-center ">
				<input
					value={career.companyName}
					onChange={(e) => handelAddCarrerCompany(e.target.value)}
					className="w-full p-4 border-b border-gray-600"
					placeholder="회사명을 입력해주세요."
				/>
				<div className="flex gap-6 items-center">
					<div className="flex gap-4  ">
						<label>
							<p className="text-xs">입사일</p>
							<input
								value={career.enteryDate}
								onChange={(e) => handelAddCarrerEntryDate(e.target.value)}
								type="date"
								className="p-2 border-b border-gray-600"
							/>
						</label>
						<label>
							<p className="text-xs">퇴사일</p>
							<input
								value={career.quitDate}
								onChange={(e) => handelAddCarrerQuitDate(e.target.value)}
								type="date"
								className="p-2 border-b border-gray-600"
							/>
						</label>
					</div>
					<label>
						<input
							hidden
							type="submit"
						/>
						<button
							onClick={() => handelAddCarrer()}
							className="text-nowrap hover:scale-95 active:scale-90 transition-all text-sm text-gray-700">
							추가
						</button>
					</label>
				</div>
			</form>
		</section>
	);
};

export default CareerEdit;
