export interface DBUserModule {
	id?: string;
	name?: string;
	email?: string;
	image?: string;
	portfolio?: DBPortFolioModule;
}
export interface DBPortFolioModule {
	id?: string;
	introduce?: DBIntroduceModule;
	urls?: DBUrlModule[];
	careers?: DBCareerModule[];
	skills?: DBSkillModule[];
	projects?: DBProjectModule[];
	createdAt?: Date;
	updatedAt?: Date;
}
export interface DBIntroduceModule {
	id?: string;
	introduce?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface DBUrlModule {
	id?: string;
	displayName?: string;
	url?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface DBSkillModule {
	id?: string;
	type?: string;
	content?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface DBCareerModule {
	id?: string;
	companyName?: string;
	entryDate?: Date;
	quitDate?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface DBProjectModule {
	id?: string;
	title?: string;
	description?: string;
	startDate?: Date;
	updateDate?: Date;
	gitUrl?: string;
	webUrl?: string;
	stacks?: Stack[];
	hide?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface Stack {
	id?: string;
	type: string;
	name: string;
	color: string;
	icon?: string;
}
