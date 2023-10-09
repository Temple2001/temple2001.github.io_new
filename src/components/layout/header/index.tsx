"use client";

import Link from "next/link";
import styles from "./style.module.scss";
import { metadata } from "@/lib/constants";
import { useNavContext } from "@/lib/navContext";
import { classNames } from "@/lib/classnames";

export default function Header() {
	const [open, setOpen] = useNavContext();

	return (
		<>
			<div className={styles.headerWrapper}>
				<div id="header" className={styles.header}>
					<div className={styles.leftBlock} />
					<Link href={"/"}>
						<div className={styles.text}>{metadata.blogName}</div>
					</Link>
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
		</>
	);
}
