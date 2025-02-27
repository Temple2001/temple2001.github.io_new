import { allDocuments, allPosts } from "@/contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import styles from "./style.module.scss";
import { mdxComponents } from "@/components/MDXComponents";
import PostBox from "@/components/layout/postbox";
import { Container } from "@/components/layout/container";
import ScrollEvent from "@/components/ScrollEvent";
import HeaderWords from "@/components/layout/header-words";
import { baseURL, blogdata } from "@/lib/constants";
import { Metadata } from "next";

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
						<MDXContent components={mdxComponents(target)} />
					</div>
				</div>
			</Container>
		);
	} else if (target.type === "Category") {
		const posts = allPosts.filter(
			(post) =>
				post._raw.sourceFileDir.startsWith(target._raw.sourceFileDir) &&
				post.blind === false
		);
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

export function generateMetadata({
	params,
}: {
	params: { slug: string[] };
}): Metadata {
	const { slug } = params;
	const target = allPosts.find((post) => {
		return slug.join("/") === post._raw.sourceFileDir;
	});

	if (!target) {
		return {
			title: blogdata.blogName,
			metadataBase: new URL(baseURL),
		};
	} else {
		return {
			title: target.title + " | " + blogdata.blogName,
			description: target.description,
			metadataBase: new URL(baseURL),
			openGraph: {
				images: [`/opengraph/${slug.join("/")}`],
			},
		};
	}
}
