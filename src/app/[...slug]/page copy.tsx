"use client";

import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "mdx/types";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { Title } from "../temp";

const components: MDXComponents = {
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

export default async function () {
	const pathname = usePathname();
	const fuck = pathname.split("/").pop();

	const { default: Document, meta: a } = require("../posts/" + fuck + ".mdx");

	const meta = a as Title;

	return (
		<MDXProvider components={components}>
			<h1>{meta.title}</h1>
			<hr />
			<Document />
		</MDXProvider>
	);
}
