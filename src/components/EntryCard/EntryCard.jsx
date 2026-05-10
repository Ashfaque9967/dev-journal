import { useState } from "react";
import styles from "./EntryCard.module.css";

function EntryCard({ entry, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const formattedDate = new Date(entry.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.title}>{entry.title}</h4>
        <span className={styles.meta}>
          {formattedDate} · {entry.timeLogged}h
        </span>
      </div>
      <p className={styles.body}>{entry.body}</p>
      <div className={styles.footer}>
        <div className={styles.tags}>
          {entry.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
        <div className={styles.deleteArea}>
          {confirmDelete ? (
            <>
              <button
                className={styles.confirmBtn}
                onClick={() => onDelete(entry.id)}
              >
                yes, delete
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setConfirmDelete(false)}
              >
                cancel
              </button>
            </>
          ) : (
            <button
              className={styles.deleteBtn}
              onClick={() => setConfirmDelete(true)}
            >
              delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
