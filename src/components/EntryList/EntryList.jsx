import EntryCard from "../EntryCard/EntryCard";
import styles from "./EntryList.module.css";

export default function EntryList({ entries, onDelete }) {
  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No entries yet</p>
        <p className={styles.emptySubtitle}>
          Hit the button in the sidebar to log your first session.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  );
}