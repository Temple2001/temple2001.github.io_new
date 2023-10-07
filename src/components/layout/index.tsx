"use client";

import styles from "./style.module.scss";
import Children from "@/components/Children";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import { NavContextProvider } from "@/lib/navContext";
import Footer from "./footer";

export default function Layout({ children }: Children) {
	return (
		<NavContextProvider>
			<Header />
			<div className={styles.grid}>
				<Navigation />
				<div className={styles.main}>
					{children}
					<Footer />
				</div>
			</div>
		</NavContextProvider>
	);
}
