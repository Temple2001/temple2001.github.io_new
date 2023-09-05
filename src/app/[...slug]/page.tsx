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
import Link from "next/link";

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
				<MDXContent components={mdxComponents} />
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
		return (
			<div className={styles.category}>
				<div className={styles.title}>{target.title}</div>
				<div className={styles.description}>{target.description}</div>
				<div>
					{posts.map((post) => {
						return (
							<Link href={"/" + post._raw.flattenedPath}>
								<div className={styles.postBox}>
									<p>글 제목 : {post.title}</p>
									<p>글 설명 : {post.description}</p>
								</div>
							</Link>
						);
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
