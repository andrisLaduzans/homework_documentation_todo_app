import { Box, Button, Stack, Typography } from "@mui/material";
import { Layout } from "../../components";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useTodoContext } from "../../store";
import { Fragment, useEffect, useState } from "react";
import { Todo } from "../../store/useTodoList";
import CircularProgress from "@mui/material/CircularProgress";

interface FormFields {
  title: string;
  description: string;
}

const schema = yup.object().shape({
  title: yup.string().required("Required Field"),
  description: yup.string().required("Required Field"),
});

export const Edit = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [todo, setTodo] = useState<Todo | null>(null);

  const { id } = useParams();

  const { list, state, dispatch } = useTodoContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormFields>({
    defaultValues: {
      title: todo?.title || "",
      description: todo?.description || "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    if (!list || !id) {
      setLoading(false);
      return;
    }

    const matchingTodoIdx = list.findIndex((todo) => todo.id === id);

    if (matchingTodoIdx === -1) {
      setLoading(false);
      return;
    }

    setTodo(list[matchingTodoIdx]);
    setValue("title", list[matchingTodoIdx].title);
    setValue("description", list[matchingTodoIdx].description);
    setLoading(false);
  }, [id, navigate, list, state, setValue]);

  const onSubmit = (data: FormFields) => {
    if (!todo) {
      throw new Error("/Edit onSubmit trying to edit non existing item");
    }

    dispatch({
      type: "EDIT",
      payload: { ...todo, ...data },
    });

    navigate("/")
  };

  return (
    <Layout>
      <Stack
        direction={"row"}
        style={{
          justifyContent: "space-between",
          paddingTop: "16px",
          paddingBottom: "16px",
          marginBottom: "24px",
        }}
      >
        <Typography variant="h4">
          {!loading && !todo ? "Not Found" : "Edit Todo:"}
        </Typography>
      </Stack>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Stack>
          {loading ? (
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Fragment>
              {!todo ? null : (
                <Fragment>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue={todo?.title}
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
                    defaultValue={todo?.description || ""}
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
                      Save
                    </Button>
                  </Stack>
                </Fragment>
              )}
            </Fragment>
          )}
        </Stack>
      </Box>
    </Layout>
  );
};
