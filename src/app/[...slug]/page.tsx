import { allPosts } from "@/contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

export default async function Post({ params }: { params: { slug: string[] } }) {
	const { slug } = params;
	const post = allPosts.find(
		(post) => post._raw.flattenedPath === slug.join("/")
	);

	if (!post) {
		return <></>; // TODO : "글을 찾을 수 없습니다" 페이지
	}

	const MDXContent = getMDXComponent(post.body.code);
	return (
		<div>
			<h1>{post.title}</h1>
			<h3>{post.description}</h3>
			<MDXContent />
		</div>
	);
}

export async function generateStaticParams() {
	const posts = allPosts;

	return posts.map((post) => {
		const path = post._raw.flattenedPath;
		return {
			slug: path.split("/"),
		};
	});
}
