import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Container, Grid, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import bookService from "../services/book.service";
import { useRecoilValue } from "recoil";
import { UserState } from "../store/UserState";
import { useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = () => {

  const navigate = useNavigate();

  const currentUser = useRecoilValue(UserState);

  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(0);

  const [allUnBooks, setAllUnBooks] = useState([]);
  const [allCompleteBooks, setAllCompleteBooks] = useState([]);
  
  const statusCompleteUpdate = (isbn) => {
    bookService.statusComplete(isbn, currentUser);
    location.reload();
  }

  useEffect(() => {
    if (Object.keys(currentUser).length === 0) {
      navigate("/login");
      return;
    }
    bookService.allUnStatusBooks(currentUser).then((response) => {
      console.log(response);
      setAllUnBooks(response);
    });
    bookService.allCompleteStatusBooks(currentUser).then((response) => {
      console.log(response);
      setAllCompleteBooks(response);
    });

  bookService.allBooks(currentUser).then(response => {
    let total = 0;
    response.forEach(element => {
      total += parseInt(element.itemPrice);
    });
    setTotal(total);
  })
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="未読了" {...a11yProps(0)} />
            <Tab label="読了" {...a11yProps(1)} />
            <Tab label="プロフィール" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={1}>
            {allUnBooks.map((book) => (
              <Grid item md={2} xs={4} key={book.isbn}>
                <img src={book.largeImageUrl} width="100%"/>
                <Button variant="outlined" color="success" style={{width: "100%"}} onClick={() => statusCompleteUpdate(book.isbn)}>
                  読了
                </Button>
              </Grid>
            ))}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={1}>
            {allCompleteBooks.map((book) => (
              <Grid item md={2} xs={4}>
                <img src={book.largeImageUrl} />
              </Grid>
            ))}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Grid item xs={12} md={12}>
              <Typography variant="h5" gutterBottom>
                {currentUser.username}さんは
              </Typography>
              <Typography variant="h3" gutterBottom>
                {total}円
              </Typography>
              <Typography variant="h6" gutterBottom>
                分の本を登録しました
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              style={{
                backgroundColor: "rgba(181,164,134,.3)",
                padding: "0.5rem",
                width: "calc(50% - 0.5rem)",
                maxWidth: "420px",
                textAlign: "center",
                borderRadius: "6px",
                boxShadoデータw: "2px 2px 4px rgba(0,0,0,.3)",
              }}
            >
              <Typography
                mt={1}
                variant="h5"
                display="block"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                本のデータ
              </Typography>
              <Typography mt={1} variant="h6" display="block" gutterBottom>
                未読了：{allUnBooks.length}冊
              </Typography>
              <Typography mt={1} variant="h6" display="block" gutterBottom>
                読了：{allCompleteBooks.length}冊
              </Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
    </Container>
  );
};

export default Profile;
