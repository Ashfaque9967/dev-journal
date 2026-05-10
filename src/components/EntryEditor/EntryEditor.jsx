import { useState } from "react";
import styles from "./EntryEditor.module.css";

function EntryEditor({ onSave, onClose }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    tags: "",
    timeLogged: "",
    date: new Date().toISOString().split("T")[0],
  });

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    if (!form.title.trim()) return;

    const entry = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      body: form.body.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      timeLogged: parseFloat(form.timeLogged) || 0,
      date: new Date(form.date).toISOString(),
    };

    onSave(entry);
    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h3 className={styles.heading}>New entry</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              type="text"
              placeholder="What did you work on?"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>What did you learn?</label>
            <textarea
              className={styles.textarea}
              placeholder="Write freely — bugs crushed, concepts clicked, things to revisit..."
              value={form.body}
              onChange={(e) => handleChange("body", e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Date</label>
              <input
                className={styles.input}
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Hours logged</label>
              <input
                className={styles.input}
                type="number"
                min="0"
                max="24"
                step="0.5"
                placeholder="2"
                value={form.timeLogged}
                onChange={(e) => handleChange("timeLogged", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Tags</label>
            <input
              className={styles.input}
              type="text"
              placeholder="React, CSS, bugs"
              value={form.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
            />
          </div>
        </div>

        <button className={styles.saveBtn} onClick={handleSave}>
          Save entry
        </button>
      </div>
    </div>
  );
}

export default EntryEditor;
