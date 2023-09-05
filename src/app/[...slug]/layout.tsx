import Children from "@/components/Children";
import styles from "./style.module.scss";

export default function Layout({ children }: Children) {
	return <div className={styles.layout}>{children}</div>;
}
