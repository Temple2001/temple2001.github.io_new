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
			<div className={styles.post}>
				<div className={styles.title}>{target.title}</div>
				<div className={styles.description}>{target.description}</div>
				<div className={styles.border} />
				<div className={styles.codeblock}>
					<MDXContent components={mdxComponents} />
				</div>
			</div>
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
			<div className={styles.category}>
				<div className={styles.title}>{target.title}</div>
				<div className={styles.description}>{target.description}</div>
				<div className={styles.flexBox}>
					{orderedPosts.map((post) => {
						return <PostBox post={post} />;
					})}
				</div>
			</div>
		);
	}
}

export async function generateStaticParams() {
	const docs = allDocuments;

	return docs.map((doc) => {
		let path = doc._raw.flattenedPath;
		if (path.endsWith(".json")) path = doc._raw.sourceFileDir;
		return {
			slug: path.split("/"),
		};
	});
}
