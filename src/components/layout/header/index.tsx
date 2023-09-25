import Link from "next/link";
import styles from "./style.module.scss";
import { metadata } from "@/lib/constants";
import TabKey from "../../../../public/assets/tab-key.svg";
import Image from "next/image";

export default function Header() {
	return (
		<div className={styles.header}>
			<Link href={"/"}>
				<div className={styles.text}>{metadata.blogName}</div>
			</Link>
			<div className={styles.tabKey}>

			</div>
		</div>
	);
}
