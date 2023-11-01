import { Post } from "@/contentlayer/generated";
import styles from "./style.module.scss";

export default function headerWords({ target }: { target: Post }) {
	return (
		<div className={styles.headerWords} id="headerWords">
			<div className={styles.container}>
				<div className={styles.title}>{target.title}</div>
				<div className={styles.description}>{target.description}</div>
			</div>
		</div>
	);
}
