import { allPosts } from "@/contentlayer/generated";
import { Metadata } from "next";
import styles from "./style.module.scss";
import PostBox from "@/components/layout/postbox";

export const metadata: Metadata = {
	title: "temple2001.github.io",
};

export default function Page() {
	const posts = allPosts;
	const orderedPosts = posts.sort(
		(a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)
	);

	return (
		<div className={styles.category}>
			<div className={styles.title}>메인 페이지</div>
			<div className={styles.flexBox}>
				{orderedPosts.map((post) => {
					return <PostBox post={post} />;
				})}
			</div>
		</div>
	);
}
