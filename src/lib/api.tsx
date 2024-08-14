import { Category, allCategories } from "@/contentlayer/generated";

export type CategoryTree = {
	category?: Category;
	children: CategoryTree[];
};

export function makeCategoryTree(path?: string) {
	path = path || "/";
	const category = allCategories.find(
		(category) => category._raw.sourceFileDir + "/" === path
	);
	const tree: CategoryTree = { category, children: [] };

	allCategories.map((category) => {
		const childPath = category._raw.sourceFileDir;
		let parsedPath = childPath.substring(0, childPath.lastIndexOf("/") + 1);

		if (parsedPath.length === 0) parsedPath = "/";

		if (path === parsedPath && childPath !== ".") {
			tree.children.push(makeCategoryTree(childPath + "/"));
		}
	});

	return tree;
}

export function isWebLink(src: string) {
	if (src.startsWith("http://") || src.startsWith("https://")) {
		return true;
	} else {
		return false;
	}
}
