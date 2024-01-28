import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Link, Stack } from "@mui/material";
import authService from "../services/auth.service";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

function ResponsiveAppBar() {
  const loginPages = ["マイページ", "人気・新着", "検索"];
  const loginPagesUrl = ["/profile", "", "/search"];
  const nonloginPages = ["人気・新着"];
  const loginSettings = ["プロフィール", "ログアウト"];
  const nonloginSettings = ["サインアップ", "ログイン"];
  const nonloginUrl = ["/signup", "/login"]
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(undefined);

  const navigate = useNavigate();

  React.useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    authService.logout();
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
                    href={loginPagesUrl[index]}
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
            href="#app-bar-with-responsive-menu"
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
            {currentUser
              ? loginPages.map((page, index) => (
                <Link  key={page} href={loginPagesUrl[index]} underline="none" style={{color: "white"}}>
                    <Stack direction="row" alignItems="top" mr={3}>      
                        {page === "検索" && (
                          <ManageSearchIcon fontSize="small" />
                        )}
                        {page}
                    </Stack>
                  </Link>
                ))
              : nonloginPages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Stack direction="row" alignItems="top">
                      {page === "検索" && <ManageSearchIcon fontSize="small" />}
                      {page}
                    </Stack>
                  </Button>
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
              {currentUser
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
export default ResponsiveAppBar;
