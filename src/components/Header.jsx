import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserState } from "../store/UserState";

const Header = () => {
  const loginPages = ["マイページ",  "検索"];
  const loginPagesUrl = ["/profile", "/search"];
  const loginSettings = ["ログアウト"];
  const nonloginSettings = ["サインアップ", "ログイン"];
  const nonloginUrl = ["/signup", "/login"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [currentUser, setCurrentUser] = useRecoilState(UserState);
  console.log(currentUser);
  const navigate = useNavigate();

  const logOut = () => {
    authService.logout(setCurrentUser, navigate);
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            読書アプリ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {loginPages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    to={loginPagesUrl[index]}
                    underline="none"
                    style={{ color: "black" }}
                  >
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            読書アプリ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Object.keys(currentUser).length !== 0 &&
              loginPages.map((page, index) => (
                <Link
                  key={page}
                  to={loginPagesUrl[index]}
                  underline="none"
                  style={{ color: "white" }}
                >
                  <Stack direction="row" alignItems="top" mr={3}>
                    {page === "検索" && <ManageSearchIcon fontSize="small" />}
                    {page}
                  </Stack>
                </Link>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="サインアップ・ログイン">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <LoginIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(currentUser).length !== 0
                ? loginSettings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      {setting === "ログアウト" ? (
                        <Button
                          variant="text"
                          onClick={logOut}
                          style={{ color: "black", fontSize: "16px" }}
                        >
                          ログアウト
                        </Button>
                      ) : (
                        <Typography textAlign="center">{setting}</Typography>
                      )}
                    </MenuItem>
                  ))
                : nonloginSettings.map((setting, index) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link
                          href={nonloginUrl[index]}
                          underline="none"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {setting}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
