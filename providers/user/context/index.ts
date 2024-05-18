import {createContext} from 'react';

import {User} from '@/models/User';

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const defContext: UserContextProps = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext(defContext);
