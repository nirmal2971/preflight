import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ChecklistItem({ item, onToggle, onUpdate, onDelete }) {
  return (
    <tr>
      <td className="td-check">{item.title}</td>

      <td className="td-status" style={{ textAlign: "center" }}>
        <input
          type="checkbox"
          checked={!!item.completed}
          onChange={() => onToggle(item)}
          style={{ width: "18px", height: "18px" }}
        />
      </td>

      <td className="td-comments">
        <input
          className="comment-input"
          value={item.description || ""}
          onChange={(e) => onUpdate(item.id, { description: e.target.value })}
          placeholder="Add comment..."
          style={{
            padding: "6px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
      </td>

      <td className="td-actions">
        <IconButton 
          onClick={() => onDelete(item.id)} 
          size="small"
          style={{ background: "#ffe5e5" }}
        >
          <DeleteIcon fontSize="small" style={{ color: "#d32f2f" }} />
        </IconButton>
      </td>
    </tr>
  );
}
