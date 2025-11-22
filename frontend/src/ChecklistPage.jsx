import React, { useEffect, useState } from "react";
import * as api from "./api";
import ChecklistItem from "./ChecklistItem";

export default function ChecklistPage() {
  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");

  // NEW STATES
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [saving, setSaving] = useState(false); // disable add button

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError("");

    try {
      const data = await api.fetchChecks();
      setItems(data);
    } catch (err) {
      setError("Failed to load checklist. Please try again.");
    }

    setLoading(false);
  }

  async function addItem(e) {
    e.preventDefault();
    if (!newTitle.trim()) return alert("Title required");

    setSaving(true);
    setError("");

    try {
      const created = await api.createCheck({
        title: newTitle,
        description: newComment
      });

      setItems(prev => [created, ...prev]);
      setNewTitle("");
      setNewComment("");
    } catch (err) {
      setError("Failed to create item.");
    }

    setSaving(false);
  }

  async function toggle(item) {
    try {
      const updated = await api.updateCheck(item.id, {
        completed: !item.completed
      });

      setItems(prev => prev.map(i => (i.id === item.id ? updated : i)));
    } catch (err) {
      setError("Failed to update status.");
    }
  }

  async function updateField(id, body) {
    try {
      const updated = await api.updateCheck(id, body);

      setItems(prev => prev.map(i => (i.id === id ? updated : i)));
    } catch (err) {
      setError("Failed to update comment.");
    }
  }

  async function remove(id) {
    if (!confirm("Delete this check?")) return;

    try {
      await api.deleteCheck(id);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      setError("Failed to delete item.");
    }
  }

  return (
    <section className="check-section">
      <h2 className="subhead">Preflight Checks</h2>

      {/* ERROR BOX */}
      {error && (
        <div style={{
          background: "#ffebee",
          padding: "10px",
          border: "1px solid #d32f2f",
          color: "#b71c1c",
          marginBottom: "10px",
          borderRadius: "4px"
        }}>
          {error}
        </div>
      )}

      {/* ADD FORM */}
      <form className="add-row" onSubmit={addItem}>
        <input
          className="add-input"
          placeholder="Add new check"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          className="add-input small"
          placeholder="Comment (optional)"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn" type="submit" disabled={saving}>
          {saving ? "Adding..." : "Add"}
        </button>
      </form>

      {/* LOADING STATE */}
      {loading && <p style={{ padding: "12px", fontWeight: "600" }}>⏳ Loading checklist...</p>}

      {/* EMPTY STATE */}
      {!loading && items.length === 0 && (
        <p style={{ padding: "12px", color: "#666" }}>
          No checks available. Add your first pre-flight check.
        </p>
      )}

      {/* TABLE */}
      {items.length > 0 && (
        <table className="checks-table">
          <thead>
            <tr>
              <th className="th-check">CHECKS</th>
              <th className="th-status">STATUS</th>
              <th className="th-comments">COMMENT(S)</th>
              <th className="th-actions">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <ChecklistItem
                key={item.id}
                item={item}
                onToggle={toggle}
                onUpdate={updateField}
                onDelete={remove}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
