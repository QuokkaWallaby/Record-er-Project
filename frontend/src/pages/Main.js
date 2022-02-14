import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, IconButton, Card, CardActions, CardContent, CardMedia, Grid, Box, Typography, CardHeader, Avatar, Pagination, Stack, CardActionArea }from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const mainPostDatas = [
  { id: 1, nickname:"jiwoon", profile: null, thumbnail: null, title: "인사1", summary:"안녕하세요1", hits : 3, created_time: "2022-03-07 14:46:04" },
  { id: 2, nickname:"younghan", profile: null, thumbnail: null, title: "인사2", summary:"안녕하세요2", hits : 39, created_time: "2022-03-08 14:46:16" },
  { id: 3, nickname:"hyeji", profile: null, thumbnail: null, title: "인사3", summary:"안녕하세요3", hits : 35, created_time: "2012-03-19 14:46:37" },
  { id: 4, nickname:"jieun", profile: null, thumbnail: null, title: "인사4", summary:"안녕하세요4", hits : 63, created_time: "1922-02-06 14:46:53" },
  { id: 5, nickname:"jiwoon", profile: null, thumbnail: null, title: "인사5", summary:"안녕하세요5", hits : 93, created_time: "2022-02-15 14:25:04" },
  { id: 6, nickname:"younghan", profile: null, thumbnail: null, title: "인사6", summary:"안녕하세요6", hits : 9, created_time: "2022-09-08 14:43:04" },
  { id: 7, nickname:"hyeji", profile: null, thumbnail: null, title: "인사7", summary:"안녕하세요7", hits : 7, created_time: "2022-02-16 14:46:04" },
  { id: 8, nickname:"jieun", profile: null, thumbnail: null, title: "인사8", summary:"안녕하세요8", hits : 15, created_time: "2022-02-26 6:46:04" },
  { id: 9, nickname:"jiwoon", profile: null, thumbnail: null, title: "인사9", summary:"안녕하세요9", hits : 4, created_time: "2022-05-06 11:46:04" },
]

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Main() {

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        setError(null);
        setPosts(null);
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/board/posts");
        setPosts(response.data);
      } catch(e) {
          setError(e);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>
  if (!posts) return null;

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >

          {/* 인기, 최근, 이웃 게시물 버튼 */}
          <Box
            sx= {{
              display: 'flex',
              flexDirection: 'row',
              }}
              noValidate
              autoComplete="off"
              >
            <Box
             sx= {{
              '& > :not(style)': { marginLeft: 4 },
              }}
              noValidate
              autoComplete="off"
              >
              <Button>인기 게시물</Button>
            </Box>
            <Box
             sx= {{

              }}
              noValidate
              autoComplete="off"
              >
              <Button>최신 게시물</Button>
            </Box>
          </Box>
        </Box>

        <Box
        sx= {{
        '& > :not(style)': { marginLeft: 1 },
        }}
        noValidate
        autoComplete="off"
        >
          {/* 게시글 */}
          <Grid container spacing={4}>
            {/* <ul>
              {posts.map(post => (
                <li key={post.post_id}>
                  {post.title}
                </li>
              ))}
            </ul> */}

            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                  sx={{ width: '86%', height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{  }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    title="zu21un"
                    subheader="2월 6일 14:46, 2022"
                  />
                  <CardActionArea component="a" href="#">
                  <CardMedia
                    component="img"
                    sx={{
                      width: 'fill',
                      height: '400px',
                      objectFit: 'cover'
                    }}
                    image="https://source.unsplash.com/random"
                    alt="사진"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      1-800-273-8255
                    </Typography>
                    <Typography>
                      Logic, Juanes 노래입니다. I've been on the low I been taking my time I feel like I'm out of my mind
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <IconButton aria-label="like">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
      </Box>

          {/* pagination */}
          <Box
             sx= {{
              display: 'flex',
              justifyContent: 'center',
              '& > :not(style)': { m: 3, marginLeft: 5 },
              
              }}
              noValidate
              autoComplete="off"
              >
              <Stack spacing={2}>
              <Pagination count={6} variant="outlined" color="primary" />
              </Stack>
          </Box>            
      </main>
    </ThemeProvider>
  );
}