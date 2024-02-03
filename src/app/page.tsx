import { allPosts } from "@/contentlayer/generated";
import { Metadata } from "next";
import styles from "./style.module.scss";
import PostBox from "@/components/layout/postbox";
import { Container } from "@/components/layout/container";
import { blogdata } from "@/lib/constants";

export const metadata: Metadata = {
	title: blogdata.blogName,
	description: blogdata.description,
};

export default function Page() {
	const posts = allPosts.filter((post) => post.blind === false);
	const orderedPosts = posts.sort(
		(a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
	);

	return (
		<Container>
			<div className={styles.profile}>
				<div className={styles.imageBox}>
					<div className={styles.image} />
					<div className={styles.icons}></div>
				</div>
				<div className={styles.about}>
					<div className={styles.title}>Temple의 블로그입니다.</div>
					<div className={styles.description}>
						Temple's Hideout에 오신 것을 환영합니다. 프로그래밍/개발에 관한
						이야기를 담고 있습니다.
					</div>
				</div>
			</div>
			<div className={styles.border} />
			<div className={styles.category}>
				<div className={styles.flexBox}>
					{orderedPosts.map((post) => {
						return <PostBox post={post} />;
					})}
				</div>
			</div>
		</Container>
	);
}
