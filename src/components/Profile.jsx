import React, { useState } from "react";
import PropTypes from "prop-types";
import AuthService from "../services/auth.service";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { SearchState } from "../store/SearchState";
import bookService from "../services/book.service";

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
  const currentUser = AuthService.getCurrentUser();

  const [value, setValue] = useState("one");

  const [books, setBooks ] = useRecoilState(SearchState);

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
          {
            console.log(bookService.allBooks())
          }
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
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
                231,0820円
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
              <Typography mt={1} variant="h5" display="block" gutterBottom style={{fontWeight: "bold"}}>
                本のデータ
              </Typography>
              <Typography mt={1} variant="h6" display="block" gutterBottom >
                未読了：1冊
              </Typography>
              <Typography mt={1} variant="h6" display="block" gutterBottom >
                読了：1冊
              </Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
    </Container>
  );
};

export default Profile;
