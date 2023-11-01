import { allDocuments, allPosts } from "@/contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import styles from "./style.module.scss";
import { mdxComponents } from "@/components/MDXComponents";
import PostBox from "@/components/layout/postbox";
import { Container } from "@/components/layout/container";
import ScrollEvent from "@/components/ScrollEvent";
import HeaderWords from "@/components/layout/header-words";

export default async function ({ params }: { params: { slug: string[] } }) {
	const { slug } = params;
	const target = allDocuments.find((docs) => {
		return slug.join("/") === docs._raw.sourceFileDir;
	});

	if (!target) {
		return <></>;
	}

	if (target.type === "Post") {
		const MDXContent = getMDXComponent(target.body.code);
		return (
			<Container>
				<ScrollEvent />
				<div className={styles.post}>
					<HeaderWords target={target} />
					<div className={styles.time}>
						{new Date(target.createdAt).toLocaleDateString("ko-KR")}
					</div>
					<div className={styles.title}>{target.title}</div>
					<div className={styles.description}>{target.description}</div>
					<div className={styles.border} id="headLine" />
					<div className={styles.contentStyle}>
						<MDXContent components={mdxComponents} />
					</div>
				</div>
			</Container>
		);
	} else if (target.type === "Category") {
		const posts = allPosts.filter((post) => {
			const dir = target._raw.sourceFileDir;
			if (dir) {
				return post._raw.sourceFileDir.startsWith(dir);
			} else {
				return false;
			}
		});
		const orderedPosts = posts.sort(
			(a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
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
		const path = doc._raw.sourceFileDir;
		return {
			slug: path.split("/"),
		};
	});
}
