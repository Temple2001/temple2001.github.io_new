import {
	Category,
	Post,
	allCategories,
	allDocuments,
	allPosts,
} from "@/contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import styles from "./style.module.scss";
import { mdxComponents } from "@/components/MDXComponents";
import PostBox from "@/components/layout/postbox";
import { Container } from "@/components/layout/container";

export default async function ({ params }: { params: { slug: string[] } }) {
	const { slug } = params;
	let target: Post | Category | undefined = allPosts.find((post) => {
		return slug.join("/") === post._raw.flattenedPath;
	});

	if (!target) {
		target = allCategories.find((category) => {
			return slug.join("/") === category._raw.sourceFileDir;
		});
	}

	if (!target) {
		return <></>;
	}

	if (target.type === "Post") {
		const MDXContent = getMDXComponent(target.body.code);
		return (
			<Container>
				<div className={styles.post}>
					<div className={styles.title}>{target.title}</div>
					<div className={styles.description}>{target.description}</div>
					<div className={styles.time}>
						{new Date(target.createdAt).toLocaleDateString("ko-KR")}
					</div>
					<div className={styles.border} />
					<div className={styles.codeblock}>
						<MDXContent components={mdxComponents} />
					</div>
				</div>
			</Container>
		);
	} else if (target.type === "Category") {
		const posts = allPosts.filter((post) => {
			const dir = target?._raw.sourceFileDir;
			if (dir) {
				return post._raw.flattenedPath.startsWith(dir);
			} else {
				return false;
			}
		});
		const orderedPosts = posts.sort(
			(a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)
		);
		return (
			<Container>
				<div className={styles.category}>
					<div className={styles.title}>{target.title}</div>
					<div className={styles.description}>{target.description}</div>
					<div className={styles.flexBox}>
						{orderedPosts.map((post) => {
							return <PostBox post={post} />;
						})}
					</div>
				</div>
			</Container>
		);
	}
}

export async function generateStaticParams() {
	const docs = allDocuments;

	return docs.map((doc) => {
		let path = doc._raw.flattenedPath;
		if (path.endsWith("_meta")) path = doc._raw.sourceFileDir;
		return {
			slug: path.split("/"),
		};
	});
}
