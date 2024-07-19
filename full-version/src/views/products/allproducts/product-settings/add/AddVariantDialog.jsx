import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
    Button,
  MenuItem
} from '@mui/material';

const AddVariantDialog = ({ open, onClose, onSave }) => {
  const [variant, setVariant] = useState({ type: '', price: '', quantity: '' });

  const handleChange = (field, value) => {
    setVariant(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(variant);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Variant</DialogTitle>
      <DialogContent>
        <TextField
          label="Type"
          value={variant.type}
          onChange={(e) => handleChange('type', e.target.value)}
          fullWidth
        />
        <TextField
          label="Price"
          value={variant.price}
          onChange={(e) => handleChange('price', e.target.value)}
          fullWidth
          type="number"
        />
        <TextField
          label="Quantity"
          value={variant.quantity}
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

export default AddVariantDialog;
