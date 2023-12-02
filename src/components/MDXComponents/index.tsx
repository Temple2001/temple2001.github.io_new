import { MDXComponents } from "mdx/types";
import styles from "./style.module.scss";
import { slug } from "github-slugger";

export const mdxComponents: MDXComponents = {
	h1: ({ children }) => (
		<>
			<h1
				id={slug(children?.toString() || "")}
				className={`${styles.heading} ${styles.heading1}`}
			>
				{children}
			</h1>
			<div className={styles.border} />
		</>
	),

	h2: ({ children }) => (
		<>
			<h2
				id={slug(children?.toString() || "")}
				className={`${styles.heading} ${styles.heading2}`}
			>
				{children}
			</h2>
			<div className={styles.border} />
		</>
	),

	h3: ({ children }) => (
		<>
			<h3
				id={slug(children?.toString() || "")}
				className={`${styles.heading} ${styles.heading3}`}
			>
				{children}
			</h3>
			<div className={styles.border} />
		</>
	),

	h4: ({ children }) => (
		<>
			<h4
				id={slug(children?.toString() || "")}
				className={`${styles.heading} ${styles.heading4}`}
			>
				{children}
			</h4>
			<div className={styles.border} />
		</>
	),

	p: ({ children }) => <p className={styles.p}>{children}</p>,

	img: (props) => <img {...props} className={styles.img} />,

	ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,

	li: ({ children }) => <li className={styles.li}>{children}</li>,

	strong: ({ children }) => (
		<strong className={styles.strong}>{children}</strong>
	),

	hr: () => <hr className={styles.hr} />,
};
