import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "../store";
import { useNavigate } from "react-router-dom";
import { FormLayout } from "../components";

interface FormFields {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be valid email")
    .max(255, "Too long")
    .required("Required Field"),
  password: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .required("Required Field"),
});

export const Login = () => {
  const navigate = useNavigate();

  const { onLogin } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormFields>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    console.log("onSubmit: ", data);
    const result = await onLogin({
      email: data.email,
      password: data.password,
    });
    console.log("result: ", result);

    if (!result.validEmail) {
      setError("email", {
        message: "This email does not exist",
      });
      return;
    }

    if (!result.validPassword) {
      setError("password", {
        message: "Invalid password",
      });
      return;
    }

    navigate("/");
  };

  return (
    <FormLayout
      title="Enter Your Credentials"
      onSubmit={handleSubmit(onSubmit)}
      ctaBtnTxt={"Log In"}
      footerLinkRoute={"/sign-up"}
      footerLinkTxt={"Don't have an account? Sign in instead!"}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Registered Email"
            autoComplete="email"
            autoFocus
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label="Your Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            {...field}
          />
        )}
      />
    </FormLayout>
  );
};
