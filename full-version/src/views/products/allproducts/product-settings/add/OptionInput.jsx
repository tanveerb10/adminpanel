import React, {useEffect} from "react";
import { Grid, Typography, InputAdornment, IconButton, Button, MenuItem } from "@mui/material"; 
import CustomTextField from "@/@core/components/mui/TextField";
const OptionInput = ({ option, optionIndex, onOptionTypeChange, onOptionValueChange, onDeleteOption, onDeleteOptionValue }) => (
    <Grid item xs={12} className="repeater-item">
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <CustomTextField
            select
            fullWidth
            label="Option Name"
            value={option.type}
            onChange={(e) => onOptionTypeChange(optionIndex, e.target.value)}
          >
            <MenuItem value="Size">Size</MenuItem>
            <MenuItem value="Color">Color</MenuItem>
            <MenuItem value="Weight">Weight</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} md={8} alignSelf="end">
          <Typography>Option Value</Typography>
          <div className="flex flex-col items-center gap-6">
            {option.values.map((value, valueIndex) => (
              <CustomTextField
                key={valueIndex}
                fullWidth
                placeholder="Enter Variant Value"
                value={value}
                onChange={(e) => onOptionValueChange(optionIndex, valueIndex, e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {valueIndex > 0 && (
                        <IconButton onClick={() => onDeleteOptionValue(valueIndex)} className="min-is-fit">
                          <i className="tabler-x" />
                        </IconButton>
                      )}
                    </InputAdornment>
                  )
                }}
              />
            ))}
            <Button
              variant="outlined"
              color="error"
              onClick={onDeleteOption}
              endIcon={<i className="tabler-trash" />}
            >
              Delete
            </Button>
          </div>
        </Grid>
      </Grid>
    </Grid>
);
  export default OptionInput