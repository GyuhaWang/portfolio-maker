export declare module 'next-auth' {
	interface User {
		accessToken: string;
	}
	interface Session {
		user: {
			id: string;
			name: string;
			email: string;
			emailVerified: boolean | null;
			image: string;
		};
		sessionToken: string;
		userId: string;
		expires: string;
	}
}
export declare module '@auth/core/jwt' {
	interface JWT {
		accessToken: string;
	}
}
