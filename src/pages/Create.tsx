import { Box, Button, Stack, Typography } from "@mui/material";
import { Layout, ToastAlert } from "../components";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTodoContext, useUserContext } from "../store";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormFields {
  title: string;
  description: string;
}

const schema = yup.object().shape({
  title: yup.string().required("Required Field"),
  description: yup.string().required("Required Field"),
});

export const Create = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: { title: "", description: "" },
    resolver: yupResolver(schema),
  });

  const { dispatch } = useTodoContext();
  const { state: userState } = useUserContext();

  const [alert, setAlert] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      setAlert(false);
    };
  }, []);

  const navigate = useNavigate();

  const onSubmit = (data: FormFields) => {
    if (
      !userState.data ||
      !userState.data.user?.isLoggedIn ||
      !userState.data?.user?.id
    ) {
      setAlert(true);
      return;
    }

    dispatch({
      type: "CREATE",
      payload: {
        id: uuidv4(),
        ownerId: userState.data.user.id,
        title: data.title,
        description: data.description,
        createdOn: new Date().toString(),
        isCompleted: false,
      },
    });

    navigate("/");
  };

  return (
    <Layout>
      <ToastAlert
        open={alert}
        setOpen={() => {
          setAlert(false);
        }}
      />

      <Stack
        direction={"row"}
        style={{
          justifyContent: "space-between",
          paddingTop: "16px",
          paddingBottom: "16px",
          marginBottom: "24px",
        }}
      >
        <Typography variant="h4">Create Todo:</Typography>
      </Stack>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Stack>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.title?.message}
                id="outlined-basic"
                label="Enter Title"
                variant="outlined"
                helperText={errors.title?.message}
                style={{ marginBottom: "24px" }}
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.description?.message}
                label="Enter description"
                multiline
                rows={4}
                helperText={errors.description?.message}
                style={{ marginBottom: "24px" }}
                {...field}
              />
            )}
          />

          <Stack style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button type={"submit"} variant="contained">
              Create
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
};
