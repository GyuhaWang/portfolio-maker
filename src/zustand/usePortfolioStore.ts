import {
	DBCareerModule,
	DBIntroduceModule,
	DBPortFolioModule,
	DBProjectModule,
	DBSkillModule,
	DBUrlModule,
	DBUserModule,
} from '@/@types/dbModule';

import { create } from 'zustand';

interface PortfolioStore {
	user: DBUserModule;
	image: () => string | undefined;
	name: () => string | undefined;
	portfolio: () => DBPortFolioModule | undefined;
	introduce: () => DBIntroduceModule | undefined;
	handleChangeIntroduce: (introduce: string) => void;
	urls: () => DBUrlModule[];
	addUrl: (url: DBUrlModule) => void;
	removeUrl: (id: string) => void;
	skills: DBSkillModule[];
	addSkill: (skill: DBSkillModule) => void;
	removeSkill: (id: string) => void;
	careers: DBCareerModule[];
	addCareer: (carrer: DBCareerModule) => void;
	removeCareer: (id: string) => void;
	projects: () => DBProjectModule[];
	updateProject: (project: DBProjectModule) => void;
	removeProject: (id: string) => void;
	setInitialUser: (user: DBUserModule) => void; // 초기화 함수 추가
}

// 초기 상태를 관리할 수 있도록 setInitialTodos 함수를 추가
const usePortfolioStore = create<PortfolioStore>((set, get) => ({
	user: {},
	image: () => {
		return get().user.image;
	},
	name: () => {
		return get().user.name;
	},

	portfolio: () => {
		return get().user.portfolio;
	},
	introduce: () => {
		return get().user.portfolio?.introduce;
	},
	handleChangeIntroduce: (introduce) =>
		set((state) => ({
			user: {
				...state.user,
				portfolio: {
					...state.user.portfolio,
					introduce: {
						...state.user.portfolio?.introduce,
						introduce: introduce,
					},
				},
			},
		})),

	urls: () => {
		return get().user.portfolio?.urls ?? [];
	},
	addUrl: (url) =>
		set((state) => ({
			user: {
				...state.user,
				portfolio: {
					...state.user.portfolio,
					urls: [...(state.user.portfolio?.urls ?? []), url],
				},
			},
		})),
	removeUrl: (id) =>
		set((state) => ({
			user: {
				...state.user,
				portfolio: {
					...state.user.portfolio,
					urls: state.user.portfolio?.urls?.filter((val) => val.id != id),
				},
			},
		})),
	skills: [],
	addSkill: (skill) =>
		set((state) => ({
			user: {
				...state.user,
				portfolio: {
					...state.user.portfolio,
					skills: [...(state.user.portfolio?.skills ?? []), skill],
				},
			},
		})),
	removeSkill: (id) =>
		set((state) => ({
			user: {
				...state.user,
				portfolio: {
					...state.user.portfolio,
					skills: state.user.portfolio?.skills?.filter((val) => val.id != id),
				},
			},
		})),
	careers: [],
	addCareer: (carrer) =>
		set((state) => ({
			user: {
				...state.user,
				portfolio: {
					...state.user.portfolio,
					careers: [...(state.user.portfolio?.careers ?? []), carrer],
				},
			},
		})),
	removeCareer: (id) =>
		set((state) => ({
			user: {
				...state.user,
				portfolio: {
					...state.user.portfolio,
					careers: state.user.portfolio?.careers?.filter((val) => val.id != id),
				},
			},
		})),
	projects: () => {
		return (
			get().user.portfolio?.projects?.filter((project) => !project.hide) ?? []
		);
	},
	updateProject: (project) =>
		set((state) => ({
			user: {
				...state.user,
				portfolio: {
					...state.user.portfolio,
					projects: state.user.portfolio?.projects?.map((val) =>
						val.id == project.id ? project : val
					),
				},
			},
		})),
	removeProject: (id) =>
		set((state) => ({
			user: {
				...state.user,
				portfolio: {
					...state.user.portfolio,
					projects: state.user.portfolio?.projects?.filter(
						(val) => val.id != id
					),
				},
			},
		})),
	setInitialUser: (user: DBUserModule) =>
		set(() => ({
			user,
		})), // 초기값을 설정하는 함수
}));

export default usePortfolioStore;
