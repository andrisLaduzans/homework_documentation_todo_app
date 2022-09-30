import { ReactNode } from "react";
import { TopNav } from "../TopNav";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Container maxWidth="md">
      <TopNav />

      <Container
        maxWidth="sm"
        style={{ backgroundColor: "#eee", minHeight: "100vh" }}
      >
        {children}
      </Container>

      <Typography>
        Andris Laduzans @ Alberta Koledža 2022
      </Typography>
    </Container>
  );
};
