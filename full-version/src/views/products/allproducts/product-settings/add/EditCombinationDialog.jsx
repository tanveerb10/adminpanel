import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

const EditCombinationDialog = ({ open, onClose, combination, onSave }) => {
  const [updatedCombination, setUpdatedCombination] = useState({ ...combination });

  useEffect(() => {
    setUpdatedCombination({ ...combination });
  }, [combination]);

  const handleChange = (field, value) => {
    setUpdatedCombination(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(updatedCombination);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Combination</DialogTitle>
      <DialogContent>
        <TextField
          label="Combination"
          value={updatedCombination.combination}
          onChange={(e) => handleChange('combination', e.target.value)}
          fullWidth
        />
        <TextField
          label="Price"
          value={updatedCombination.price}
          onChange={(e) => handleChange('price', e.target.value)}
          fullWidth
          type="number"
        />
        <TextField
          label="Quantity"
          value={updatedCombination.quantity}
          onChange={(e) => handleChange('quantity', e.target.value)}
          fullWidth
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCombinationDialog;
