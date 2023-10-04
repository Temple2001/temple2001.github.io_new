"use client";

import Children from "@/components/Children";
import "./global.scss";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import Layout from "@/components/layout";
import { useEffect } from "react";

export default function RootLayout({ children }: Children) {
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", "light");
	}, []);

	return (
		<html lang="ko">
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
