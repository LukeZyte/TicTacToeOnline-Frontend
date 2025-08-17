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
import { NavigationRoutes } from "../utils/enums/navigation-routes.enum";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../api/axios.config";
import { ApiEndpoints } from "../utils/enums/api-endpoints.enum";

type FormData = {
  login: string;
  username: string;
  password: string;
  repeatPassword: string;
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signupLoading, setSignupLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "onSubmit" });
  const passwordValue = watch("password");

  const onTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSignInClick = () => {
    navigate(`/${NavigationRoutes.SignIn}`);
  };

  const onSignUpSubmit = (data: FormData) => {
    setSignupLoading(true);

    axiosInstance
      .post(ApiEndpoints.AuthRegister, {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        console.log("SIGN UP:", response.data);
        navigate(`/${NavigationRoutes.SignIn}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setSignupLoading(false);
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
      <Container maxWidth="sm">
        <Card variant="outlined" style={{ padding: 32 }}>
          <Typography variant="h4">Sign up</Typography>
          <form onSubmit={handleSubmit(onSignUpSubmit)}>
            <Stack gap={1} marginTop={4}>
              <FormControl fullWidth error={!!errors.username}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Username is required",
                    minLength: {
                      value: 5,
                      message: "Username must contain at least 5 characters",
                    },
                  }}
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
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must contain at least 5 characters",
                    },
                  }}
                  render={({ field }) => (
                    <OutlinedInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      {...field}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={onTogglePassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                <FormHelperText>{errors.password?.message}</FormHelperText>
              </FormControl>
              <FormControl fullWidth error={!!errors.repeatPassword}>
                <InputLabel htmlFor="repeatPassword">
                  Repeat Password
                </InputLabel>
                <Controller
                  name="repeatPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "This field is required",
                    validate: (value) =>
                      value === passwordValue ||
                      "Repeat password must be the same as Password",
                  }}
                  render={({ field }) => (
                    <OutlinedInput
                      id="repeatPassword"
                      type={showPassword ? "text" : "password"}
                      label="Repeat Password"
                      {...field}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={onTogglePassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                <FormHelperText>
                  {errors.repeatPassword?.message}
                </FormHelperText>
              </FormControl>
            </Stack>

            <Stack gap={1} marginTop={4}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                loading={signupLoading}
              >
                Sign up
              </Button>
              <Button variant="outlined" onClick={onSignInClick}>
                Log in to existing account
              </Button>
            </Stack>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default SignUp;
