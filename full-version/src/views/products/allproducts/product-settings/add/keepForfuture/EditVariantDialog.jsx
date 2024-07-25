import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

const EditVariantDialog = ({ open, onClose, variant, onSave }) => {
  const [updatedVariant, setUpdatedVariant] = useState({ ...variant });

  useEffect(() => {
    setUpdatedVariant({ ...variant });
  }, [variant]);

  const handleChange = (field, value) => {
    setUpdatedVariant(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(updatedVariant);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Variant</DialogTitle>
      <DialogContent>
        <TextField
          label="Type"
          value={updatedVariant.type}
          onChange={(e) => handleChange('type', e.target.value)}
          fullWidth
        />
        <TextField
          label="Price"
          value={updatedVariant.price}
          onChange={(e) => handleChange('price', e.target.value)}
          fullWidth
          type="number"
        />
        <TextField
          label="Quantity"
          value={updatedVariant.quantity}
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

export default EditVariantDialog;
