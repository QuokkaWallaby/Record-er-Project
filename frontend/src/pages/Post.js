import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import { Button, Stack, Avatar, Box, Typography, Grid } from '@mui/material';

export default function Post() {

  // 댓글 입력 창 관련
  const blue = {
    200: '#80BFFF',
    400: '#3399FF',
  };
  const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
  };
  const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 500px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 8px;
    padding: 12px 12px;
    transition: all 150ms ease;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:focus {
      outline: 2px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      outline-offset: 2px;
    }
  `,
  );
  const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
      <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
    );
  });
  
  const CustomTypography = styled(Typography)`
    &:hover {
      color: #ff5f70;
      cursor: pointer;
    }
    `;

  const CustomAvatar = styled(Avatar)`
  &:hover {
    color: dark ? grey[300] : grey[900];
    cursor: pointer;
  }
  `;

  const CustomButton = styled(Button)`
  background: white;
  color: #ff5f70;
  &:hover {
    background : white;
    cursor: pointer;
  }
  `;
  
  const [ postData, setPostData ] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { postId } = useParams();

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    axios.get('http://localhost:8080/board/posts/' + `${postId}`)
    .then((res) => {
      setPostData(res.data);
      console.log(res.data);
    })
  }

  const onClickUser = () => {
    navigate('/Userhome/' + `${postData.userId}`)
  }

  // 게시글 수정, 삭제
  //////////////////////////////////수정//////////////////////////////////
  const onPostUpdate = () => {
    navigate('/EditorUpdate/' + `${postId}`)
  }

  //////////////////////////////////삭제//////////////////////////////////
  const useConfirm = (message=null, onConfirm, onCancel) => {

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };

    return confirmAction;
  }

  const deleteConfirm = () => {
    axios.delete('http://localhost:8080/board/posts/' + `${postId}`)
    .then(() => {
      alert('게시물을 성공적으로 삭제했습니다!')
      navigate('/Userhome/' + `${currentUser.userId}`)
    })
    .catch(() => {
      alert('게시물 삭제를 실패했습니다!')
    })
  }

  const cancelConfirm = () => {
    navigate(0);
  }

  const onPostDelete = useConfirm(
    "게시물을 삭제하시겠습니까?",
    deleteConfirm,
    cancelConfirm
  );

  let authorityUpdate, authorityDelete = null;

  if(postData.userId === currentUser.userId) {
    authorityUpdate = <CustomButton onClick={onPostUpdate}>수정</CustomButton>
    authorityDelete = <CustomButton onClick={onPostDelete}>삭제</CustomButton>
  } else {}

  return(
    <Box
      sx={{
        mt: '20px',
        width: '800px',
        border: '1px solid pink',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 타이틀 */}
      <Box sx={{ 
        width: '600px',
        display: 'flex', 
        flexDirection: 'column', 
        pb: 3, 
        alignItems: 'center' 
        }}
      >
        <Typography variant="h4" sx={{ py: '20px' }}>{postData.title}</Typography>
      </Box>

      <Box sx={{
        width: '600px',
        display: 'flex', 
        flexDirection: 'row', 
        pb: 5,
        }}
      >
        {authorityUpdate}
        {authorityDelete}
      </Box>
    
      {/* 작성자 */}
      <Box sx={{ 
        width: '600px',
        display: 'flex', 
        flexDirection: 'column', 
        pb: 5, 
        alignItems: 'end' 
        }}
      >
        <CustomTypography onClick={onClickUser}>{postData.userNickname}</CustomTypography>
      </Box>

      {/* 내용 */}
      <Box
        sx={{
          width: '600px',
          display: 'flex',
          flexDirection: 'column',
          pb: 10,
          alignItems: 'start',
        }}
      >
      {postData.content}
      </Box>

      {/* 하단 작성자 프로필사진, 이름, 설명 */}
      <Box 
        sx={{ 
          width: '600px',
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <CustomAvatar alt="" src={postData.profilePhoto} onClick={onClickUser} sx={{ width: 80, height: 80, mr: '10px' }}/>
        <Stack spacing={1}>
          <CustomTypography variant="h6" onClick={onClickUser}>{postData.domain}</CustomTypography>
          <Typography variant="h7" >{postData.introduce}</Typography>
        </Stack>
      </Box>

      
      {/* 댓글 입력 */}
      <Stack direction="row" spacing={1} sx={{ my: 3 }}>
        <CustomInput aria-label="Demo input" placeholder="댓글을 입력해주세요" />
        <Button size="small" sx={{ backgroundColor: '#ff5f70', color: 'white', ':hover': { bgcolor: '#ffc0cb'}}}>등록</Button>
      </Stack>

    </Box>
  );   
}