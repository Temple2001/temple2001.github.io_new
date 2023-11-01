"use client";

import Link from "next/link";
import styles from "./style.module.scss";
import { blogdata } from "@/lib/constants";
import { useNavContext } from "@/lib/navContext";
import { classNames } from "@/lib/classnames";
import { Orbitron } from "next/font/google";
import DarkModeButton from "../dark-mode-button";

const orbitron = Orbitron({ subsets: ["latin"] });

export default function Header() {
	const [open, setOpen] = useNavContext();

	return (
		<>
			<div className={styles.headerWrapper}>
				<div id="header" className={styles.header}>
					<div className={styles.leftBlock} />
					<Link href={"/"}>
						<div className={`${styles.text} ${orbitron.className}`}>
							{blogdata.blogName}
						</div>
					</Link>
					<div className={styles.buttons}>
						<div className={styles.dmButton}>
							<DarkModeButton />
						</div>
						<div
							{...classNames(styles.tabKey, open && styles.open)}
							onClick={() => setOpen(!open)}
						>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
