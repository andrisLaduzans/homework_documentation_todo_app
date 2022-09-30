import CssBaseline from "@mui/material/CssBaseline";
import { Fragment } from "react";
import { Navigation } from "./Navigation";
import { Providers } from "./Providers";

export function App() {
  return (
    <Fragment>
      <Providers>
        <CssBaseline />

        <Navigation />
      </Providers>
    </Fragment>
  );
}
