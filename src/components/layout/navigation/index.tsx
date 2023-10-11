import { CategoryTree, makeCategoryTree } from "@/lib/api";
import styles from "./style.module.scss";
import Link from "next/link";
import { useNavContext } from "@/lib/navContext";
import { classNames } from "@/lib/classnames";
import { usePathname } from "next/navigation";
import { Nanum_Gothic } from "next/font/google";

const nanumGothic = Nanum_Gothic({ weight: "800", subsets: ["latin"] });

export default function Navigation() {
	const categoryTree: CategoryTree = makeCategoryTree();
	const pathname = usePathname();

	const [open, setOpen] = useNavContext();

	return (
		<div className={`${styles.navWrapper} ${nanumGothic.className}`}>
			<div
				{...classNames(styles.navigation, open && styles.open)}
				onClick={() => setOpen(false)}
			>
				<LeafNode trees={categoryTree.children} pathname={pathname} />
			</div>
		</div>
	);
}

export function LeafNode({
	trees,
	pathname,
}: {
	trees: CategoryTree[];
	pathname: string;
}) {
	if (trees.length === 0) return;

	return (
		<div className={styles.leafCategory}>
			{trees.map((tree) => {
				if (tree.category) {
					return (
						<div className={styles.items}>
							<Link href={"/" + tree.category._raw.sourceFileDir}>
								<div
									className={`${styles.link} ${
										pathname === "/" + tree.category._raw.sourceFileDir + "/"
											? styles.selected
											: ""
									}`}
								>
									{tree.category.title}
								</div>
							</Link>
							<LeafNode trees={tree.children} pathname={pathname} />
						</div>
					);
				}
			})}
		</div>
	);
}
