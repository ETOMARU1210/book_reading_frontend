import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { useRecoilState } from "recoil";
import { UserState } from "../store/UserState";

const Register = () => {
  let navigate = useNavigate();

  const [,setCurrentUser] = useRecoilState(UserState);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const handleLogin = (data) => {

    authService.register(
      getValues("username"),
      getValues("email"),
      getValues("password"),
      setCurrentUser,
      navigate
    )
    navigate("/");
  };

  return (
    <Container>
      <LoginCard>
        <Typography variant="h5" gutterBottom>
          サインアップ
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
                label="ユーザーネーム"
                {...register("username", { required: true })}
              />
            </>
          )}

          {errors.email ? (
            <TextField
              error
              id="filled-error-helper-text"
              label="エラー"
              helperText="メールアドレスが間違っています"
              variant="filled"
              fullWidth
            />
          ) : (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="メールアドレス"
                {...register("email", { required: true, pattern: {
                  value:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                }
                })}
              />
            </>
          )}

          {errors.password ? (
            <TextField
              error
              id="filled-error-helper-text"
              label="エラー"
              helperText="パスワードが間違っています"
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
                {...register("password", { required: true , minLength: 8})}
              />
            </>
          )}
          <Button
            variant="contained"
            color="success"
            fullWidth
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            ユーザー登録する
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

export default Register;
