import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  weight: number;
  height: number;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface Profile {
  data: object;
  field: string;
}

interface ChangePassword {
  data: object;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  handleUpdateUser(profile: Profile): void;
  handleChangeUserPassword(credentials: ChangePassword): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@FitLife:token',
        '@FitLife:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@FitLife:token', token],
      ['@FitLife:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token[1]}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@FitLife:user', '@FitLife:token']);

    setData({} as AuthState);
  }, []);

  const handleUpdateUser = useCallback(async ({ data, field }) => {
    const [token, user] = await AsyncStorage.multiGet([
      '@FitLife:token',
      '@FitLife:user',
    ]);
    console.log(data)
    const response = await api.patch('/users', data, {
      headers: {
        'Authorization': `Bearer ${token[1]}`
      }
    });
    
    await AsyncStorage.multiSet([
      ['@FitLife:token', token[1]],
      ['@FitLife:user', JSON.stringify(user)],
    ]);
    
    setData({ token: token[1], user: response.data });
  }, []);

  const handleChangeUserPassword = useCallback(async ({ data }) => {
    const [token, user] = await AsyncStorage.multiGet([
      '@FitLife:token',
      '@FitLife:user',
    ]);

    await api.patch('/users/changePassword', data, {
      headers: {
        'Authorization': `Bearer ${token[1]}`
      }
    });
  }, []);  

  return (
    <AuthContext.Provider value={
      { 
        user: data.user, 
        loading, 
        signIn, 
        signOut,
        handleUpdateUser,
        handleChangeUserPassword 
      }
    }>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };