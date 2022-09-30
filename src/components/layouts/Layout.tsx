import { ReactNode } from "react";
import { TopNav } from "../TopNav";
import Container from "@mui/material/Container";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Container maxWidth="md" style={{ backgroundColor: "magenta" }}>
      <TopNav />

      <Container
        maxWidth="sm"
        style={{ backgroundColor: "pink", minHeight: "100vh" }}
      >
        {children}
      </Container>
    </Container>
  );
};
