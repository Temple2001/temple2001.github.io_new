import { CategoryTree, makeCategoryTree } from "@/lib/api";
import styles from "./style.module.scss";
import Link from "next/link";
import { useNavContext } from "@/lib/navContext";
import { classNames } from "@/lib/classnames";

export default function Navigation() {
	const categoryTree: CategoryTree = makeCategoryTree();

	const [open, setOpen] = useNavContext();

	return (
		<div className={styles.navWrapper}>
			<div
				{...classNames(styles.navigation, open && styles.open)}
				onClick={() => setOpen(false)}
			>
				<LeafNode trees={categoryTree.children} />
			</div>
		</div>
	);
}

export function LeafNode({ trees }: { trees: CategoryTree[] }) {
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
