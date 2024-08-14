import Link from "next/link";
import styles from "./style.module.scss";
import { Post } from "@/contentlayer/generated";
import { isWebLink } from "@/lib/api";

export default function PostBox({ post }: { post: Post }) {
	const convertLink = (post: Post) => {
		if (isWebLink(post.previewImage)) {
			return post.previewImage;
		} else {
			return `/${post._raw.sourceFileDir}/${post.previewImage}`;
		}
	};
	return (
		<div className={styles.outside}>
			<Link href={"/" + post._raw.sourceFileDir}>
				<div className={styles.postBox}>
					<div className={styles.textBox}>
						<div className={styles.title}>{post.title}</div>
						<div className={styles.description}>{post.description}</div>
						<div className={styles.time}>
							{new Date(post.createdAt).toLocaleDateString("ko-KR")}
						</div>
					</div>
					{post.previewImage && (
						<div className={styles.imageBox}>
							<img src={convertLink(post)} alt="preview image" />
						</div>
					)}
				</div>
			</Link>
		</div>
	);
}
