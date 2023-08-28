import styles from './style.module.scss'
import {metadata} from '@/lib/constants';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.text}>{metadata.blogName}</div>
    </div>
  )
}