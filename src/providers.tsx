'use client';

import React, { ReactNode } from 'react';
import { ModalProvider } from 'react-modal-hook';
import { SessionProvider } from 'next-auth/react';
interface Props {
	children: ReactNode;
}
function Provider({ children }: Props) {
	return (
		<SessionProvider>
			<ModalProvider>{children} </ModalProvider>;
		</SessionProvider>
	);
}

export default Provider;
