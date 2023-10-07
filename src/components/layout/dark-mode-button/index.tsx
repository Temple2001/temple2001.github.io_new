"use client";

import styles from "./style.module.scss";
import DarkModeIcon from "../../../../public/assets/darkmode.svg";
import { useEffect } from "react";

export default function DarkModeButton() {
	useEffect(() => {
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
	}, []);

	const onChange = () => {
		if (document.documentElement.getAttribute("data-theme") === "light") {
			document.documentElement.setAttribute("data-theme", "dark");
			window.localStorage.setItem("data-theme", "dark");
		} else {
			document.documentElement.setAttribute("data-theme", "light");
			window.localStorage.setItem("data-theme", "light");
		}
	};

	return (
		<div className={styles.button} onClick={onChange}>
			<DarkModeIcon />
		</div>
	);
}
