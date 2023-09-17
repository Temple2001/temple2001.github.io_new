import Image from "next/image";
import styles from "./style.module.scss";

export default function ({ src, alt }: { src: string; alt: string }) {
	return (
		<div className={styles.imageBox}>
			<Image
				src={src}
				alt={alt}
				width={0}
				height={0}
				sizes="100vw"
				className={styles.image}
			/>
		</div>
	);
}
