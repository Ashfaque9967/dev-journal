import { getHeatmapData } from "../../utils/storage";
import styles from "./HeatmapCalendar.module.css";

function HeatmapCalendar({ entries }) {
  const counts = getHeatmapData(entries);
  const weeks = buildWeeks();

  function buildWeeks() {
    const days = [];
    const today = new Date();

    for (let i = 83; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push(date.toLocaleDateString("en-CA"));
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }

  function getLevel(date) {
    const count = counts[date] || 0;
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    return 3;
  }

  return (
    <div className={styles.heatmap}>
      <p className={styles.label}>Last 12 weeks</p>
      <div className={styles.grid}>
        {weeks.map((week, wi) => (
          <div key={wi} className={styles.week}>
            {week.map((date) => (
              <div
                key={date}
                className={`${styles.day} ${styles[`level${getLevel(date)}`]}`}
                title={`${date}: ${counts[date] || 0} entries`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeatmapCalendar;
