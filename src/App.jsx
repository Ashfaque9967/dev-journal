import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import EntryList from "./components/EntryList/EntryList";
import EntryEditor from "./components/EntryEditor/EntryEditor";
import { useEntries } from "./hooks/useEntries";
import styles from "./App.module.css";

function App() {
  const { entries, handleSave, handleDelete } = useEntries();
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeTag, setActiveTag] = useState(null);

  const filteredEntries = activeTag
    ? entries.filter((e) => e.tags.includes(activeTag))
    : entries;

  function handleTagClick(tag) {
    setActiveTag((prev) => (prev === tag ? null : tag));
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Sidebar
          entries={entries}
          activeTag={activeTag}
          onTagClick={handleTagClick}
          onNewEntry={() => setEditorOpen(true)}
        />
      </aside>
      <main className={styles.main}>
        <EntryList entries={filteredEntries} onDelete={handleDelete}/>
      </main>
      {editorOpen && (
        <EntryEditor onSave={handleSave} onClose={() => setEditorOpen(false)} />
      )}
    </div>
  );
}

export default App;
