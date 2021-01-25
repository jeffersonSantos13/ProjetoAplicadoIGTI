import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

import api from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  weight: number;
  height: number;
  first_login: boolean;
  avatar_url: string;
  gender: string;
  desire_weight: number;
  sub: string;
  providerId: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  age: number;
  phone: string;
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

interface ChangeAvatar {
  image: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  handleUpdateUser(profile: Profile): void;
  handleChangeUserPassword(credentials: ChangePassword): void;
  handleSendPhotoAvatar(avatar: ChangeAvatar): void;
  googleSignIn(): void;
  handleDeleteUser(): void;
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

  const handleSendPhotoAvatar = useCallback(async ({ image }) => {
    const [token, user] = await AsyncStorage.multiGet([
      '@FitLife:token',
      '@FitLife:user',
    ]);

    const formData = new FormData();

    formData.append('fileimage', image);

    const response = await api.patch('users/avatar', formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
    });
    
    await AsyncStorage.multiSet([
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

  const handleDeleteUser = useCallback(async ({ data }) => {
    const [token] = await AsyncStorage.multiGet([
      '@FitLife:token',
    ]);

    await api.delete('/users', {
      headers: {
        'Authorization': `Bearer ${token[1]}`
      }
    });

    signOut();
  }, []); 

  const googleSignIn = useCallback(async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const { additionalUserInfo } = await auth().signInWithCredential(googleCredential);
      const { email, name, picture, sub } = additionalUserInfo.profile;
      const { providerId } = additionalUserInfo;

      let avatar = false;

      const verifyUserExists = await api.get('users/oauth', {
       params: {
        email,
        providerId
       }
      });

      const { name: nameProfile } = verifyUserExists.data;
      console.log(nameProfile)
      if (typeof nameProfile === undefined) {
        await api.post('users/oauth', {
          email,
          password: sub,
          name,
          sub,
          providerId,
        });

        avatar = true;
      }

      const response = await api.post('sessions/oauth', {
        email,
        password: sub,
        sub,
        providerId
      });

      let { token, user } = response.data;

      if (avatar) {
        let formData = new FormData();
        formData.append("fileimage", picture);

        const res = await api.patch('users/avatar', formData, {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            "Authorization": `Bearer ${token}`,
           },
        });
      }
  
      await AsyncStorage.multiSet([
        ['@FitLife:token', token],
        ['@FitLife:user', JSON.stringify(user)],
        ['@FitLife:oauth', idToken],
      ]);
  
      api.defaults.headers.authorization = `Bearer ${token}`;
  
      setData({ token, user });

    } catch(error) {
      console.log({error});
    }
  }, []);

  return (
    <AuthContext.Provider value={
      { 
        user: data.user, 
        loading, 
        signIn, 
        signOut,
        handleUpdateUser,
        handleChangeUserPassword,
        handleSendPhotoAvatar,
        googleSignIn,
        handleDeleteUser,
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