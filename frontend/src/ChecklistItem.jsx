import React from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ChecklistItem({ item, onToggle, onUpdate, onDelete, onView }) {
  return (
    <tr>
      <td className="td-check">{item.title}</td>

      <td className="td-status" style={{ textAlign: "center" }}>
        <input
          type="checkbox"
          checked={!!item.completed}
          onChange={() => onToggle(item)}
        />
      </td>

      <td className="td-comments">
        <input
          className="comment-input"
          value={item.description || ""}
          onChange={(e) => onUpdate(item.id, { description: e.target.value })}
        />
      </td>

      <td className="td-actions">
        <IconButton onClick={() => onView()} size="small">
          <VisibilityIcon fontSize="small" />
        </IconButton>

        <IconButton onClick={() => onDelete(item.id)} size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}