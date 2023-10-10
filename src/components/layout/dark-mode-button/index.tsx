import styles from "./style.module.scss";
import DarkModeIcon from "../../../../public/assets/darkmode.svg";

export default function DarkModeButton() {
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
