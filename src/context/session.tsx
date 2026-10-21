import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Role, RoleId } from '@/data/types';
import { ROLES } from '@/data/roles';

interface SessionState {
  role: Role | null;
  ready: boolean;
  signIn: (id: RoleId) => void;
  signOut: () => void;
  switchRole: (id: RoleId) => void;
}

const SessionContext = createContext<SessionState>({
  role: null,
  ready: false,
  signIn: () => {},
  signOut: () => {},
  switchRole: () => {},
});

const KEY = 'agrim.role';

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((saved) => {
        if (saved && ROLES[saved as RoleId]) setRole(ROLES[saved as RoleId]);
      })
      .finally(() => setReady(true));
  }, []);

  const signIn = useCallback((id: RoleId) => {
    setRole(ROLES[id]);
    AsyncStorage.setItem(KEY, id);
  }, []);

  const switchRole = signIn;

  const signOut = useCallback(() => {
    setRole(null);
    AsyncStorage.removeItem(KEY);
  }, []);

  return (
    <SessionContext.Provider value={{ role, ready, signIn, signOut, switchRole }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
