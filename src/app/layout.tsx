import Children from "@/components/Children";
import "./global.scss";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import Layout from "@/components/layout";

export default function RootLayout({ children }: Children) {
	return (
		<html lang="ko">
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
					const saved = window.localStorage.getItem("data-theme");
					if (saved) {
						if (saved === "dark") {
							document.documentElement.setAttribute("data-theme", "dark");
						} else if (saved === "light") {
							document.documentElement.setAttribute("data-theme", "light");
						}
					} else {
						document.documentElement.setAttribute("data-theme", "light");
					}
				`,
					}}
				></script>
			</head>
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
