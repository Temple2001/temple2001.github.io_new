import { MDXComponents } from "mdx/types";
import styles from "./style.module.scss";

export const mdxComponents: MDXComponents = {
	h1: ({ children }) => (
		<h1 className={`${styles.heading} ${styles.heading1}`}>{children}</h1>
	),
	h2: ({ children }) => (
		<h2 className={`${styles.heading} ${styles.heading2}`}>{children}</h2>
	),
	h3: ({ children }) => (
		<h3 className={`${styles.heading} ${styles.heading3}`}>{children}</h3>
	),
	h4: ({ children }) => (
		<h4 className={`${styles.heading} ${styles.heading4}`}>{children}</h4>
	),
};
