import React, { useEffect, useState } from "react";
import ChecklistItem from "./ChecklistItem";
import FlightDialog from "./FlightDialog";

export default function ChecklistPage() {
  // ✅ Dummy checklist items (Option 1)
  const [items, setItems] = useState([
    { id: 1, title: "Check Fuel Quantity", completed: false, description: "OK" },
    { id: 2, title: "Inspect Engine Oil", completed: true, description: "Completed" },
    { id: 3, title: "Verify Navigation Systems", completed: false, description: "" },
    { id: 4, title: "Check Tire Pressure", completed: false, description: "To verify" },
    { id: 5, title: "Safety Equipment Check", completed: true, description: "Done" }
  ]);

  // For adding new items (still works offline)
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");

  // Dialog visibility state
  const [viewOpen, setViewOpen] = useState(false);

  // ❌ Backend load disabled (you are using dummy data)
  useEffect(() => {}, []);

  // Add new checklist row (local only)
  function addItem(e) {
    e.preventDefault();
    if (!newTitle.trim()) return alert("Title required");

    const newItem = {
      id: Date.now(),
      title: newTitle,
      description: newComment,
      completed: false
    };

    setItems(prev => [newItem, ...prev]);
    setNewTitle("");
    setNewComment("");
  }

  // Toggle checkbox (local only)
  function toggle(item) {
    setItems(prev =>
      prev.map(i =>
        i.id === item.id
          ? { ...i, completed: !i.completed }
          : i
      )
    );
  }

  // Update comment (local only)
  function updateField(id, payload) {
    setItems(prev =>
      prev.map(i =>
        i.id === id
          ? { ...i, ...payload }
          : i
      )
    );
  }

  // Delete a row (local only)
  function remove(id) {
    if (!confirm("Delete this check?")) return;
    setItems(prev => prev.filter(i => i.id !== id));
  }

  return (
    <section className="check-section">
      <h2 className="subhead">Preflight Checks</h2>

      {/* Add row form */}
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
        <button className="btn" type="submit">Add</button>
      </form>

      {/* Checklist table */}
      <table className="checks-table">
        <thead>
          <tr>
            <th className="th-check">CHECKS</th>
            <th className="th-status">STATUS</th>
            <th className="th-comments">COMMENT(S)</th>
            <th className="th-actions">ACTIONS</th>
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
              onView={() => setViewOpen(true)}
            />
          ))}
        </tbody>
      </table>

      {/* View dialog popup */}
      <FlightDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
      />
    </section>
  );
}
