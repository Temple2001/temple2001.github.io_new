import Link from "next/link";
import styles from "./style.module.scss";
import { Post } from "@/contentlayer/generated";

export default function PostBox({ post }: { post: Post }) {
	return (
		<div className={styles.outside}>
			<Link href={"/" + post._raw.flattenedPath}>
				<div className={styles.postBox}>
					<div className={styles.title}>{post.title}</div>
					<div className={styles.description}>{post.description}</div>
				</div>
			</Link>
		</div>
	);
}
