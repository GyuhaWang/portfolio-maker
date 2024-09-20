'use client';

import React, { ReactNode } from 'react';
import { ModalProvider } from 'react-modal-hook';
interface Props {
	children: ReactNode;
}
function Provider({ children }: Props) {
	return <ModalProvider>{children} </ModalProvider>;
}

export default Provider;
