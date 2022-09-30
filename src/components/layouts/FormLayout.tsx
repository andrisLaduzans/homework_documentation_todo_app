import { ReactNode } from "react";
import { Container, Box, Avatar, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  ctaBtnTxt: string;
  footerLinkRoute: string;
  footerLinkTxt: string;
}

export const FormLayout = ({
  children,
  onSubmit,
  title,
  ctaBtnTxt,
  footerLinkRoute,
  footerLinkTxt,
}: Props) => {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          flex: 0,
          width: "99%",
          maxWidth: "99%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 7,
        }}
      >
        <Avatar sx={{ m: 0, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">{title}</Typography>

        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 0 }}>
          {children}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            {ctaBtnTxt}
          </Button>

          <Link to={footerLinkRoute}>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              {footerLinkTxt}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
