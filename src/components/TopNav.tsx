import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useUserContext } from "../store";
import { Fragment } from "react";

export const TopNav = () => {
  const { state: userState, onLogout } = useUserContext();

  return (
    <Stack
      direction={"row"}
      style={{
        justifyContent: "flex-end",
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      {userState.status !== "success" ? (
        <CircularProgress />
      ) : (
        <Fragment>
          {userState.data?.user?.isLoggedIn ? (
            //lets ignore this antipattern :)
            <Link to="" onClick={onLogout}>
              <Typography variant="body1">Log Out</Typography>
            </Link>
          ) : (
            <Link to="/login">
              <Typography variant="body1">Login</Typography>
            </Link>
          )}
        </Fragment>
      )}
    </Stack>
  );
};
