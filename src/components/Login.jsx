import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const Login = () => {
  let navigate = useNavigate();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const handleLogin = () => {

    authService.login(getValues("username"), getValues("password"));
    navigate("/")
  };

  return (
    <Container>
      <LoginCard>
        <Typography variant="h5" gutterBottom>
          ログイン
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          {errors.username ? (
            <TextField
              error
              id="filled-error-helper-text"
              label="エラー"
              helperText="ユーザー名が空白です"
              variant="filled"
              fullWidth
            />
          ) : (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="ユーザー名"
                {...register("username", { required: true })}
              />
            </>
          )}

          {errors.password ? (
            <TextField
              error
              id="filled-error-helper-text"
              label="エラー"
              helperText="パスワードが空白です"
              variant="filled"
              type="password"
              fullWidth
            />
          ) : (
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
          )}
          <Button variant="contained" color="success" fullWidth type="submit"  disabled={!isValid || isSubmitting}>
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
