import React from 'react';

import {UserContext} from './context';
import {useAuthChanged} from './hooks';

interface UserProviderProps {
  children: React.ReactNode;
}
const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useAuthChanged();

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
