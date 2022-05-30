import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import '../components/Editor/index.css';
import { styled, alpha } from '@mui/material/styles';
import { Box, Stack, Button, Divider, Input, Menu, MenuItem } from '@mui/material';
// EditIcon, ArchiveIcon, FileCopyIcon, MoreHorizIcon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StylesProvider } from '@mui/styles';
import { registerPost } from '../redux/actions/auth';
import { allCategories } from '../redux/actions/category';
import axios from 'axios';

import EditorBox from '../components/Editor/EditorBox';

import parse from 'html-react-parser';


const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
  ))
  (({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 150,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));



export default function EditorUpdate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [successful, setSuccessful] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { user: currentUser } = useSelector((state) => state.auth);
    const { data: categories } = useSelector((state) => state.category);

    const [disabled, setDisabled] = useState(false);
    const { postId } = useParams();


    // 카테고리 조회
    useEffect(() => {
      getCategories();
      getPosts();
      console.log(categories);
    }, []);

    const getCategories = () => {
      dispatch(allCategories(currentUser.userId))
      .then((data) => {
        console.error(data);
      })
      .catch((error) => {
        console.error(error);
      })
    }

    // postdata
    const [ postData, setPostData ] = useState([]);

    function getPosts() {
        axios.get('http://localhost:8080/board/posts/' + `${postId}`)
        .then((res) => {
          setPostData(res.data);
          console.log(res.data);
        })
    }

    

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        // console.log('event', event.target.innerText);
        // setCategory(event.target.innerText);
        setAnchorEl(null);
    };

    const onUpdatePost = (e) => {
      setDisabled(true);

      e.preventDefault();

      setSuccessful(false);

      axios.put('http://localhost:8080/board/posts/' + `${postId}`)
      .then((res) => {
        console.log('success', res);
        setSuccessful(true);
        navigate('/');
      })
      .catch((err) => {
        console.log('error', err);
        setSuccessful(false);
        setDisabled(false);
      });

    }

    const onTitleHandler = (e) => {
      // console.log('title', e.target.value);
      setTitle(e.target.value);
    }

    return (
          <Box
                sx={{ 
                    width: '700px',
                    display: 'flex',
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
              <Box sx={{
                    display: 'flex',
                    alignItems: 'left',
                    mt: '10px'
                }}>
              <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{ 
                        width: '150px',
                        height: '40px',
                    }}
                >   
                    {/* {categoryName=='' ? '카테고리' : categoryName} */}
                    카테고리
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                  {categories &&
                    categories.map((category) => {
                      <MenuItem onClick={handleClose} disableRipple key={category.id}>
                          {/* {category.categoryName} */}
                      </MenuItem>
                    })}
                </StyledMenu>
              </Box>
            
                <Input 
                    
                    sx={{ 
                        width: '90%',
                        px: '10px',
                        my: '10px',
                        fontSize: 'h5.fontSize',
                        fontStyle: 'bold',
                    }}
                    onChange={onTitleHandler} 
                />
                <EditorBox
                  UserId={currentUser.userId}
                  value={postData.content}
                  SetContent={setContent}
                />
            <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '90%',
                    mt: '10px'
                }}>
                <Stack spacing={1} direction="row" >
                    <Button variant="outlined" disableElevation>취소</Button>
                    <Button variant="contained" onClick={onUpdatePost} disableElevation disabled={disabled} >Update</Button>
                </Stack>
            </Box>
          </Box>
    );
}



  
