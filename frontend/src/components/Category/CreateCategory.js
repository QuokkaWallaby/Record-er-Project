import React from 'react';
import { Box, Stack } from '@mui/material';

function CreateCategory({ categoryname, onChange, onCreate }) {
  return (
    <Box>
      <Stack direction='row' spacing={2} sx={{ mb: 4 }}>
        <Box sx={{ mr: 5 }}>
          <input
            name="categoryname"
            placeholder="카테고리명"
            onChange={onChange}
            value={categoryname}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <button onClick={onCreate}>등록</button>
      </Stack>
    </Box>
  );
}

export default CreateCategory;