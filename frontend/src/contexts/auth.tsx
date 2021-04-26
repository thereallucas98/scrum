import React, { createContext, useState, useEffect, useContext } from 'react';
import history from './history';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  can_create: boolean;
}

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut(): void;
  updateProfile: (email: string, password: string, id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await localStorage.getItem("Heloo:user");
      const storagedToken = await localStorage.getItem("Heloo:token");

      // await new Promise(resolve => setTimeout(resolve, 2000));

      if (storageUser && storagedToken) {
        setUser(JSON.parse(storageUser));
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }

      setLoading(false);
      // history.push('/dashboard');
    }

    loadStorageData();
  }, [])

  async function signIn(email: string, password: string) {
    try {
      const data = {
        email,
        password,
      };

      const response = await api.post('auth', data);

      const { token, user } = response.data;

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      await localStorage.setItem("Heloo:user", JSON.stringify(user));
      await localStorage.setItem("Heloo:token", token);

      setUser(user);

      history.push('/dashboard');
    } catch (error) {
      if (error.response?.data) {
        console.log(error.response.data.error);
      }
    }
  }

  async function signOut() {
    localStorage.clear();

    setUser(null);
    setLoading(false);

    history.push('/');
  }

  async function updateProfile(name: string, email: string, id: string) {
    // const data = {
    //   name,
    //   email,
    //   id
    // }

    const response = await api.patch(`/user/${id}`, {
      name,
      email,
    });

    console.log(response.data);

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      password: response.data.password,
      can_create: response.data.can_create,
      created_at: response.data.create_at
    }

    console.log(user);

    // console.log(user);

    setUser(user);
  }

  return(
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      signIn,
      signOut,
      updateProfile,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}