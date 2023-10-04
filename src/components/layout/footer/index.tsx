import DarkModeButton from "../dark-mode-button";
import styles from "./style.module.scss";
import { metadata } from "@/lib/constants";

export default function Footer() {
	return (
		<div className={styles.footer}>
			<div className={styles.content}>
				{metadata.blogName}
				<DarkModeButton />
			</div>
		</div>
	);
}
