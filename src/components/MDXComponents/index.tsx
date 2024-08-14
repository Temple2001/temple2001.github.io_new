import { MDXComponents } from "mdx/types";
import styles from "./style.module.scss";
import { slug } from "github-slugger";
import InfoSVG from "../../../public/assets/information.svg";
import Image from "next/image";
import { Post } from "@/contentlayer/generated";
import { isWebLink } from "@/lib/api";

export const mdxComponents = (post: Post): MDXComponents => ({
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

	img: (props) => {
		let imgSrc: string;
		if (!props.src) imgSrc = "";
		else {
			if (isWebLink(props.src)) {
				imgSrc = props.src;
			} else {
				imgSrc = `/${post._raw.sourceFileDir}/${props.src}`;
			}
		}
		return (
			<div className={styles.imageBox}>
				<Image
					src={imgSrc}
					alt={imgSrc}
					width={1000}
					height={1000}
					loading="lazy"
					className={styles.img}
				/>
				<p className={styles.description}>{props.alt}</p>
			</div>
		);
	},

	ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,

	ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,

	li: ({ children }) => <li className={styles.li}>{children}</li>,

	strong: ({ children }) => (
		<strong className={styles.strong}>{children}</strong>
	),

	hr: () => <hr className={styles.hr} />,

	a: (props) => (
		<a {...props} className={styles.a}>
			{props.children}
		</a>
	),

	blockquote: (props) => (
		<div className={styles.blockquote}>
			<div className={styles.title}>
				<InfoSVG className={styles.svg} />
				Infomation
			</div>
			<div className={styles.content}>{props.children}</div>
		</div>
	),

	aside: ({ children }) => (
		<div className={styles.blockquote}>
			<div className={styles.title}>
				<InfoSVG className={styles.svg} />
				Infomation
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	),

	table: ({ children }) => (
		<div className={styles.tableContainer}>
			<table className={styles.table}>{children}</table>
		</div>
	),
});
