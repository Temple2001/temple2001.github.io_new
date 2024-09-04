import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
	name: "Post",
	contentType: "mdx",
	filePathPattern: "**/_post.mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
			required: true,
		},
		createdAt: {
			type: "date",
			required: true,
		},
		blind: {
			type: "boolean",
			required: false,
			default: false,
		},
	},
	computedFields: {
		previewImage: {
			type: "string",
			resolve: (post) => {
				const match = post.body.raw.match(/!\[.*?\]\((.*?)\)/);
				return match ? match[1] : "";
			},
		},
	},
}));

export const Category = defineDocumentType(() => ({
	name: "Category",
	contentType: "data",
	filePathPattern: "**/_meta.json",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
		},
	},
}));

/** @type {import('rehype-pretty-code').Options} */
const rehypeOptions = {
	grid: true,
	theme: "one-dark-pro",
};

const contentSource = makeSource({
	contentDirPath: "public",
	documentTypes: [Post, Category],
	mdx: {
		remarkPlugins: [
			remarkBreaks,
			[remarkToc, { heading: "목차" }],
			remarkUnwrapImages,
			remarkGfm,
		],
		rehypePlugins: [[rehypePrettyCode, rehypeOptions]],
	},
});
export default contentSource;
