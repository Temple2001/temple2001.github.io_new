import { MDXComponents } from "mdx/types";
import styles from "./style.module.scss";
import Image from "../layout/image";

export const mdxComponents: MDXComponents = {
	h1: ({ children }) => (
		<>
			<h1 className={`${styles.heading} ${styles.heading1}`}>{children}</h1>
			<div className={styles.border} />
		</>
	),
	h2: ({ children }) => (
		<>
			<h2 className={`${styles.heading} ${styles.heading2}`}>{children}</h2>
			<div className={styles.border} />
		</>
	),
	h3: ({ children }) => (
		<>
			<h3 className={`${styles.heading} ${styles.heading3}`}>{children}</h3>
			<div className={styles.border} />
		</>
	),
	h4: ({ children }) => (
		<>
			<h4 className={`${styles.heading} ${styles.heading4}`}>{children}</h4>
			<div className={styles.border} />
		</>
	),
	li: ({ children }) => <li>{children}</li>,
	Image,
};
