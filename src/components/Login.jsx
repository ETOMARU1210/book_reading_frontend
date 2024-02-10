import { Button, SnackbarContent, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { useRecoilState } from "recoil";
import { UserState } from "../store/UserState";
import { LoginErrorState } from "../store/LoginErrorMessageState";

const Login = () => {
  let navigate = useNavigate();

  const [, setCurrentUser] = useRecoilState(UserState);
  const [loginerrorMsg, setLoginErrorMsg] = useRecoilState(LoginErrorState);

  const {
    handleSubmit,
    register,
    getValues,
    resetField,
    formState: { isValid, isSubmitting },
  } = useForm();
  const handleLogin = () => {
    authService.login(
      getValues("username"),
      getValues("password"),
      setCurrentUser,
      navigate,
      setLoginErrorMsg
    );
    resetField("username", "");
    resetField("password", "");
  };

  return (
    <Container>
      {loginerrorMsg && <SnackbarContent message={loginerrorMsg} style={{maxHeight: "100%"}} />}
      <LoginCard>
        <Typography variant="h5" gutterBottom>
          ログイン
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="ユーザー名"
              {...register("username", { required: true })}
            />
          </>
          <>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="パスワード"
              type="password"
              {...register("password", { required: true })}
            />
          </>
          <Button
            variant="contained"
            color="success"
            fullWidth
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            ログイン
          </Button>
        </form>
      </LoginCard>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
});

const LoginCard = styled("div")({
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0 , 0, 0, 0.1)",
});

export default Login;
