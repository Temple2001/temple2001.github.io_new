import { allDocuments, allPosts } from "@/contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import styles from "./style.module.scss";

export default async function ({ params }: { params: { slug: string[] } }) {
	const { slug } = params;
	const target = allDocuments.find((doc) => {
		return slug.join("/") === doc._raw.flattenedPath;
	});

	if (!target) {
		return <></>; // TODO : "글을 찾을 수 없습니다" 페이지
	}

	if (target.type === "Post") {
		const MDXContent = getMDXComponent(target.body.code);
		return (
			<div>
				<h1>{target.title}</h1>
				<h3>{target.description}</h3>
				<MDXContent />
			</div>
		);
	} else if (target.type === "Category") {
		const posts = allPosts.filter((post) =>
			post._raw.flattenedPath.startsWith(target._raw.sourceFileDir)
		);
		return (
			<div>
				<p>{target.title}</p>
				<p>{target.description}</p>
				<div className={styles.category}>
					{posts.map((post) => {
						return (
							<div className={styles.postBox}>
								<p>글 제목 : {post.title}</p>
								<p>글 설명 : {post.description}</p>
							</div>
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
		const path = doc._raw.flattenedPath;
		return {
			slug: path.split("/"),
		};
	});
}
