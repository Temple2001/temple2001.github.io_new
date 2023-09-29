"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

const context = createContext<
	[boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

export function NavContextProvider({ children }: { children: ReactNode }) {
	const state = useState<boolean>(false);

	return <context.Provider value={state}>{children}</context.Provider>;
}
export const useNavContext = () => useContext(context)!!;
