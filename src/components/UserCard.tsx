import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { User } from "../types/User";

interface UserCardProps {
  user: User;
  onShowDetails: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onShowDetails }) => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardMedia
        component="img"
        image={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
        sx={{ height: { xs: 200, sm: 250, md: 300 }, objectFit: "cover" }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" } }}
        >
          {user.name.first} {user.name.last}
        </Typography>
        <Button
          onClick={onShowDetails}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            py: { xs: 1, sm: 1.5 },
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          {t("showDetails")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
