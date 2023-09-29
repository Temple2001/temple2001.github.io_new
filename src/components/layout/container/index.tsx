import Children from "@/components/Children";
import styles from "./style.module.scss";

export function Container({ children }: Children) {
	return <div className={styles.container}>{children}</div>;
}
