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
  passwordConfirm: string;
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
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const SignUp = () => {
  const navigate = useNavigate();

  const { onSignIn } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormFields>({
    defaultValues: { email: "", password: "", passwordConfirm: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    const response = await onSignIn({
      email: data.email,
      password: data.password,
    });

    if (response) {
      setError("email", { message: response });
      return;
    }

    navigate("/");
  };

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      title={"Create Account"}
      ctaBtnTxt={"Sign Up"}
      footerLinkRoute={"/login"}
      footerLinkTxt={"Already have an account? Login instead"}
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
            label="Email Address"
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
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="passwordConfirm"
            autoComplete="new-password"
            error={!!errors.passwordConfirm?.message}
            helperText={errors.passwordConfirm?.message}
            {...field}
          />
        )}
      />
    </FormLayout>
  );
};
