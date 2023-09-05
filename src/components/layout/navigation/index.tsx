import { CategoryTree, makeCategoryTree } from "@/lib/api";
import styles from "./style.module.scss";
import Link from "next/link";

export default function Navigation() {
	const categoryTree: CategoryTree = makeCategoryTree();

	return (
		<div className={styles.navigation}>
			<LeafNode trees={categoryTree.children} />
		</div>
	);
}

function LeafNode({ trees }: { trees: CategoryTree[] }) {
	if (trees.length === 0) return;

	return (
		<div className={styles.category}>
			{trees.map((tree) => {
				if (tree.category) {
					return (
						<div className={styles.leafCategory}>
							<Link href={"/" + tree.category._raw.sourceFileDir}>
								{tree.category.title}
							</Link>
							<LeafNode trees={tree.children} />
						</div>
					);
				}
			})}
		</div>
	);
}
