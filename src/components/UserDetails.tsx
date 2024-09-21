import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { User } from "../types/User";

interface UserDetailsProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          width: { sm: "100%", md: "80%" },
          maxWidth: { sm: "none", md: 600 },
          m: { xs: 0, sm: 2 },
          height: { xs: "100%", sm: "auto" },
        },
      }}
    >
      <DialogTitle sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
        {user.name.first} {user.name.last}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              image={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              sx={{ width: "100%", borderRadius: 1, mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" paragraph>
              {t("gender")}: {user.gender}
            </Typography>
            <Typography variant="body1" paragraph>
              {t("email")}: {user.email}
            </Typography>
            <Typography variant="body1" paragraph>
              {t("phone")}: {user.phone}
            </Typography>
            <Typography variant="body1" paragraph>
              {t("location")}: {user.location.city}, {user.location.country}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetails;
