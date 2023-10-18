import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { AddIconWithBgBlack } from '@/assets/icons';
import CloseIcon from '@mui/icons-material/Close';

import { v4 as uuidv4 } from 'uuid';

const selectOptions = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' },
  { id: 'option4', label: 'Option 5' },
];

export const UsersAdd = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddIconWithBgBlack />}
        color="secondary"
      >
        Add User
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add User
          <CloseIcon
            onClick={handleClose}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              right: 10,
              top: 10,
            }}
          />
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <Select
              label="Select an option"
              value={selectedValue}
              onChange={handleChange}
            >
              {selectOptions.map((option) => (
                <MenuItem key={uuidv4()} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 4 }}>
            <Select
              label="Select an option"
              value={selectedValue}
              onChange={handleChange}
            >
              {selectOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
