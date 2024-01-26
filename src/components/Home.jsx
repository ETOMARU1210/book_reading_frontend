import {
  Box,
  Button,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/auth.service";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, []);

  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography
          variant="h2"
          gutterBottom
          pb={1}
          fontWeight="bold"
          borderBottom={2}
          width={1}
          fontSize="30px"
        >
          CONCEPT
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          fontSize="20px"
          letterSpacing="3px"
        >
          買った本を読みたい
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          fontSize="20px"
          letterSpacing="3px"
        >
          しかし、どのくらい読んでさらにモチベーションを高めたいと思いませんか？
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          fontSize="20px"
          letterSpacing="3px"
        >
          読んだ本の数が増えれば増えるほど自分の成長が放物線のように成長します
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          fontSize="20px"
          letterSpacing="3px"
        >
          読んだ本の総額がわかる 書籍管理サービスです
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography
          variant="h2"
          gutterBottom
          pb={1}
          fontWeight="bold"
          borderBottom={2}
          width={1}
          fontSize="30px"
          textAlign="center"
        >
          HOW TO USE
        </Typography>
        <Grid
          container
          rowSpacing={{ xs: 2, sm: 2, md: 3 }}
          columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          mt={3}
        >
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image="src\assets\img\magnifying_glass.png"
                alt="虫眼鏡の画像"
                style={{ maxWidth: "50%", height: "auto" }}
              />
              <CardContent>
                <Typography
                  variant="h2"
                  gutterBottom
                  fontWeight="bold"
                  fontSize="30px"
                >
                  1. 読みたい本を検索する
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  書籍の検索は検索画面からできます
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image="src\assets\img\registration.png"
                alt="本の登録画像"
                style={{ maxWidth: "58%", height: "auto" }}
              />
              <CardContent>
                <Typography
                  variant="h2"
                  gutterBottom
                  fontWeight="bold"
                  fontSize="30px"
                >
                  2. 読みたい本を登録する
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  検索結果の「これを読む」を押すと、書籍を登録できます
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image="src\assets\img\praise.png"
                alt="自分をほめている画像"
                style={{ maxWidth: "58%", height: "auto" }}
              />
              <CardContent>
                <Typography
                  variant="h2"
                  gutterBottom
                  fontWeight="bold"
                  fontSize="30px"
                >
                  3.自分を褒める
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  読んだ本の総額を見て自分をほめましょう
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image="src\assets\img\flowchart.png"
                alt="フローチャートの画像"
                style={{ maxWidth: "44%", height: "auto" }}
              />
              <CardContent>
                <Typography
                  variant="h2"
                  gutterBottom
                  fontWeight="bold"
                  fontSize="30px"
                >
                  4. 読了を増やしていく
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  読みはじめたり、読み終わったら、ステータスを変更しましょう
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {
        <Stack mt={5} textAlign="center" mb={{ xs: 5 }}>
          <Typography
            variant="button"
            gutterBottom
            fontSize={24}
            fontWeight="bold"
          >
            あなたはどのくらい読んでいますか？
          </Typography>
          !currentUser && (
          <Button variant="outlined" color="error">
            <Link to="/login" style={{ textDecoration: "none", color: "red" }}>
              ログインして始める
            </Link>
          </Button>
        </Stack>
      }
    </Container>
  );
};

export default Home;
