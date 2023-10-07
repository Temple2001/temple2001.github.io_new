import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";

export const Post = defineDocumentType(() => ({
	name: "Post",
	contentType: "mdx",
	filePathPattern: "**/*.mdx",
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
	},
	/*
	computedFields: {
		publicPath: {
			type: "string",
			resolve: (post) => "/" + post._raw.flattenedPath,
		},
	},
	*/
}));

export const Category = defineDocumentType(() => ({
	name: "Category",
	contentType: "data",
	filePathPattern: "**/*.json",
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
	contentDirPath: "posts",
	documentTypes: [Post, Category],
	mdx: {
		remarkPlugins: [remarkBreaks, [remarkToc, { heading: "목차" }]],
		rehypePlugins: [[rehypePrettyCode, rehypeOptions]],
	},
});
export default contentSource;
