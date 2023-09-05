import Link from "next/link";
import styles from "./style.module.scss";
import { metadata } from "@/lib/constants";

export default function Header() {
	return (
		<div className={styles.header}>
			<Link href={"/"}>
				<div className={styles.text}>{metadata.blogName}</div>
			</Link>
		</div>
	);
}
