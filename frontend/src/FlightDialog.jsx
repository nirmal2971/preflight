import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function FlightDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Flight Information</DialogTitle>

      <DialogContent dividers>
        <Typography><strong>FLIGHT NUMBER:</strong> Outbound F_____ L 01</Typography>
        <Typography><strong>DATE:</strong> ____/____/2023</Typography>
        <br />

        <Typography><strong>Filed By:</strong> __________</Typography>
        <Typography><strong>Filing Time:</strong> __________</Typography>
        <br />

        <Typography><strong>Departure Location:</strong> __________</Typography>
        <Typography><strong>Departure Time:</strong> __________</Typography>
        <br />

        <Typography><strong>Arrival Location:</strong> __________</Typography>
        <Typography><strong>Est. Arrival Time:</strong> __________</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  );
}