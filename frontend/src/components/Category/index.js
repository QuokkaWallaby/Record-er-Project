import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import CategoryList from './CategoryList';
import CreateCategory from './CreateCategory';
import { Box, Stack } from '@mui/material';

export default function Category() {

  const [inputs, setInputs] = useState({
    categoryname: '',
  });
  const { categoryname } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [categorys, setCategorys] = useState([
    {
      id: 1,
      categoryname: '카테고리1',
    },
    {
      id: 2,
      categoryname: '카테고리2',
    },
    {
      id: 3,
      categoryname: '카테고리3',
    },
    {
      id: 4,
      categoryname: '카테고리4',
    }
  ]);
  const nextCategory = { current: 4 };
  const onCreate = () => {
    const category = {
      id: nextCategory.current,
      categoryname
    };
    setCategorys(categorys.concat(category));

    setInputs({
      categoryname: '',
    });
    nextCategory.current += 1;
  };


  const onRemove = id => {
    setCategorys(categorys.filter(category => category.id !== id));
  };

  const onToggle = id => {
    setCategorys(
      categorys.map(category =>
        category.id === id ? { ...category, active: !category.active } : category
      )
    );
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={openModal}>Edit</button>
      <Modal open={modalOpen} close={closeModal} header="카테고리 설정">
        <Box sx={{ mb: 3 }}>
          <CreateCategory
            categoryname={categoryname}
            onChange={onChange}
            onCreate={onCreate}
          />
        </Box>
        <CategoryList categorys={categorys} onRemove={onRemove} onToggle={onToggle} />
      </Modal>
    </React.Fragment>
  );
}