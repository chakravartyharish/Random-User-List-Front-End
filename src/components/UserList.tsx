import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { useUser } from "../context/UserContext";
import UserCard from "./UserCard";
import UserDetails from "./UserDetails";

const UserList: React.FC = () => {
  const { users, selectedUser, setSelectedUser, loading, error, refreshUsers } =
    useUser();

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "300px" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography color="error">{error}</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={refreshUsers}>
            Try Again
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
      {users.map((user, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <UserCard user={user} onShowDetails={() => setSelectedUser(user)} />
        </Grid>
      ))}
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </Grid>
  );
};

export default UserList;
