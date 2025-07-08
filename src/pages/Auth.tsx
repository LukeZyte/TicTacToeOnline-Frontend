import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { NavigationRoutes } from "../utils/enums/navigation-routes.enum";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../api/axios.config";
import { ApiEndpoints } from "../utils/enums/api-endpoints.enum";
import { SessionStorageEnum } from "../utils/enums/session-storage.enum";

type FormData = {
  username: string;
  password: string;
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onSubmit" });

  const onTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSignUpClick = () => {
    navigate(`/${NavigationRoutes.SignUp}`);
  };

  const onSignInSubmit = (data: FormData) => {
    setLoginLoading(true);

    axiosInstance
      .post(ApiEndpoints.AuthLogin, {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        console.log("LOG IN:", response.data);
        sessionStorage.setItem(SessionStorageEnum.Token, response.data.token);
        sessionStorage.setItem(
          SessionStorageEnum.ExpiryDate,
          response.data.expiryDate
        );

        navigate(`/${NavigationRoutes.Board}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  return (
    <Box
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" style={{ alignSelf: "center" }}>
        <Card variant="outlined" style={{ padding: 32 }}>
          <Typography variant="h4">Log in</Typography>

          <form onSubmit={handleSubmit(onSignInSubmit)}>
            <Stack gap={1} marginTop={4}>
              <FormControl fullWidth error={!!errors.username}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Username is required" }}
                  render={({ field }) => (
                    <OutlinedInput id="username" label="Username" {...field} />
                  )}
                />
                <FormHelperText>{errors.username?.message}</FormHelperText>
              </FormControl>

              <FormControl fullWidth error={!!errors.password}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <OutlinedInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      {...field}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={onTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                <FormHelperText>{errors.password?.message}</FormHelperText>
              </FormControl>
            </Stack>

            <Stack gap={1} marginTop={4}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                loading={loginLoading}
              >
                Sign in
              </Button>
              <Button variant="outlined" onClick={onSignUpClick}>
                Create a new account
              </Button>
            </Stack>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default Auth;
