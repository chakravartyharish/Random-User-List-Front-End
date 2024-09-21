import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import { User } from "../types/User";

interface UserContextType {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  refreshUsers: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const CACHE_KEY = "randomUserCache";
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const getCachedUsers = (): User[] | null => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const { users, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      return users;
    }
  }
  return null;
};

const setCachedUsers = (users: User[]) => {
  const cacheData = {
    users,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const cachedUsers = getCachedUsers();
      if (cachedUsers) {
        setUsers(cachedUsers);
      } else {
        const fetchedUsers = await fetchUsers(5);
        setUsers(fetchedUsers);
        setCachedUsers(fetchedUsers);
      }
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        setSelectedUser,
        refreshUsers,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
