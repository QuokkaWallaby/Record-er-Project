import React from 'react';
import { Box, Stack } from '@mui/material';

function Category({ category, onRemove, onToggle }) {
  return (
    <Box>
      <Stack direction='row' spacing={2} sx={{ mb: 4 }}>
        <Box sx={{ mr: 5 }}>
          <b>{category.categoryname}</b>
        </Box>
        <span>{category.blog}</span>
        <Box sx={{ flexGrow: 1 }} />
        <button onClick={() => onRemove(category.id)}>삭제</button>
      </Stack>
    </Box>
  );
}

function CategoryList({ categorys, onRemove, onToggle }) {
  return (
    <Box>
      {categorys.map(category => (
        <Category category={category} key={category.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </Box>
  );
}

export default CategoryList;