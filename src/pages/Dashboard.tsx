import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Layout, ToastAlert, TodoCard } from "../components";
import { useNavigate } from "react-router-dom";
import { useTodoContext, useUserContext } from "../store";
import { Fragment, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const Dashboard = () => {
  const { state: userState } = useUserContext();
  const { list, state: store } = useTodoContext();
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setAlert(false);
    };
  }, []);

  const navigate = useNavigate();

  const onCreate = () => {
    if (!userState.data?.user?.isLoggedIn) {
      setAlert(true);
      return;
    }
    navigate("/create");
  };

  const onEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const onCompleted = (id: string) => {
    console.log("should complete: ", id);
  };

  const onDeleted = (id: string) => {
    console.log("should delete: ", id);
  };

  return (
    <Fragment>
      <ToastAlert
        open={alert}
        setOpen={() => {
          setAlert(false);
        }}
      />
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
          <Typography variant="h4">My Todo List</Typography>

          <Button variant="contained" endIcon={<AddIcon />} onClick={onCreate}>
            Add New
          </Button>
        </Stack>

        <Stack alignItems={"center"}>
          {store.status !== "success" ? (
            <CircularProgress />
          ) : (
            <Fragment>
              {list.length < 1 ? (
                <Typography variant="h6">
                  Click "Add New +" Button to add new todo!
                </Typography>
              ) : (
                <Fragment>
                  {list.map((item, idx) => {
                    return (
                      <TodoCard
                        key={`${idx}`}
                        {...item}
                        onEdit={() => onEdit(item.id)}
                        onCompleted={() => onCompleted(item.id)}
                        onDelete={() => onDeleted(item.id)}
                      />
                    );
                  })}
                </Fragment>
              )}
            </Fragment>
          )}
        </Stack>
      </Layout>
    </Fragment>
  );
};
