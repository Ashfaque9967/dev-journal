import { getStreak } from "../../utils/storage";
import styles from "./Sidebar.module.css"
import HeatmapCalendar from "../HeatmapCalendar/HeatmapCalendar";

function Sidebar({ entries, activeTag, onTagClick, onNewEntry }) {
  const streak = getStreak(entries);
  const total = entries.length;

  const allTags = [...new Set(entries.flatMap((e) => e.tags))].sort();

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <h1 className={styles.logo}>Dev Journal</h1>
      </div>
      <div className={styles.middle}>
        <HeatmapCalendar entries={entries} />
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{total}</span>
            <span className={styles.statLabel}>total sessions</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{streak}</span>
            <span className={styles.statLabel}>day streak</span>
          </div>
        </div>

        {allTags.length > 0 && (
          <div className={styles.tagSection}>
            <p className={styles.sectionLabel}>Filter by tag</p>
            <div className={styles.tags}>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`${styles.tag} ${activeTag === tag ? styles.tagActive : ""}`}
                  onClick={() => onTagClick(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <button className={styles.newBtn} onClick={onNewEntry}>
          + New entry
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
