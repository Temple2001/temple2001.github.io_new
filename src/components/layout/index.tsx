import styles from "./style.module.scss";
import Children from "@/components/Children";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";

export default function Layout({ children }: Children) {
	return (
		<>
			<Header />
			<Navigation />
			<div className={styles.main}>{children}</div>
		</>
	);
}
