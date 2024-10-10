'use client';

import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import usePortfolioStore from '@/zustand/usePortfolioStore';
import { DBCareerModule } from '@/@types/dbModule';
import { DateToInputDate } from '@/utils/format';
import { v4 as uuidv4 } from 'uuid';
const CareerEdit = () => {
	const { user, addCareer, removeCareer } = usePortfolioStore();
	const [career, setCareer] = useState<DBCareerModule>({ id: uuidv4() });

	const handelAddCarrerCompany = (val: string) => {
		setCareer((prev) => {
			return { ...prev, ['companyName']: val };
		});
	};

	const handelAddCarrerEntryDate = (val: Date) => {
		setCareer((prev) => {
			return { ...prev, ['entryDate']: val };
		});
	};
	const handelAddCarrerQuitDate = (val: Date) => {
		setCareer((prev) => {
			return { ...prev, ['quitDate']: val };
		});
	};
	const handleRemoveCareer = (id: string | undefined) => {
		if (id) {
			removeCareer(id);
		}
	};
	const handleAddCarrer = () => {
		addCareer(career);
		setCareer({ id: uuidv4() });
	};
	return (
		<section className=" flex flex-col gap-8 ">
			<div className=" flex flex-col gap-3 ">
				<div className="flex flex-col text-3xl font-bold gap-2">
					<h1>경력</h1>
					<div className="w-full bg-gray-100  h-[2px]" />
				</div>

				{user.portfolio?.careers?.map((target, index) => (
					<div
						key={target.id}
						className="flex justify-between items-center px-2">
						<div className="flex grow-[5]  text-lg font-semibold border-b-2 border-gray-50 py-2 ">
							{target.companyName}
						</div>
						<div className="flex grow-[1] text-nowrap font-semibold text-gray-700 justify-end gap-2">
							<div className="flex justify-start items-center text-xs sm:text-md flex-col sm:flex-row sm:gap-1 ">
								<h1>{target.entryDate?.toDateString()}</h1>
								<h1>~</h1>
								<h1>
									{target.quitDate ? target.quitDate.toDateString() : ' 재직중'}
								</h1>
							</div>
							<button
								className="hover:scale-95 active:scale-90 transition-all"
								onClick={() => handleRemoveCareer(target.id)}>
								<HighlightOffIcon fontSize="small" />
							</button>
						</div>
					</div>
				))}
			</div>
			<form
				action={() => handleAddCarrer()}
				className="flex flex-col sm:flex-row gap-3 sm:gap-10 justify-between items-center ">
				<input
					value={career.companyName ?? ''}
					onChange={(e) => handelAddCarrerCompany(e.target.value)}
					className="w-full p-4 border-b border-gray-600"
					placeholder="회사명을 입력해주세요."
				/>
				<div className="flex gap-6 items-center">
					<div className="flex gap-4  ">
						<label>
							<p className="text-xs">입사일</p>
							<input
								value={
									career.entryDate ? DateToInputDate(career.entryDate) : ''
								}
								onChange={(e) =>
									handelAddCarrerEntryDate(new Date(e.target.value))
								}
								type="date"
								className="p-2 border-b border-gray-600"
							/>
						</label>
						<label>
							<p className="text-xs">퇴사일</p>
							<input
								value={career.quitDate ? DateToInputDate(career.quitDate) : ''}
								onChange={(e) =>
									handelAddCarrerQuitDate(new Date(e.target.value))
								}
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
							onClick={(e) => {
								e.preventDefault();
								handleAddCarrer();
							}}
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
