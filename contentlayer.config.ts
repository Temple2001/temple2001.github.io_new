import { defineDocumentType, makeSource } from "contentlayer/source-files";

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
		path: {
			type: "string",
			resolve: (post) => post._raw.sourceFileDir,
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

const contentSource = makeSource({
	contentDirPath: "posts",
	documentTypes: [Post, Category],
	mdx: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});
export default contentSource;
