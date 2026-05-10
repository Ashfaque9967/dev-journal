import { useState } from "react";
import { getEntries, saveEntry, deleteEntry } from "../utils/storage";

export function useEntries() {
  const [entries, setEntries] = useState(() => getEntries());

  function handleSave(entry) {
    saveEntry(entry);
    setEntries(getEntries());
  }

  function handleDelete(id) {
    deleteEntry(id);
    setEntries(getEntries());
  }

  return { entries, handleSave, handleDelete };
}
