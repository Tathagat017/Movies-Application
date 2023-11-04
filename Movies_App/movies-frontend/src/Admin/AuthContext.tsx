import { createContext, useContext, useState, ReactNode } from "react";

interface AdminAuthContextProps {
  adminAuth: boolean;
  setAdminAuth: (auth: boolean) => void;
  userAuth: boolean;
  setUserAuth: (auth: boolean) => void;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(
  undefined
);

export function useAdminAuthContext() {
  const context = useContext(AdminAuthContext);

  return context;
}

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [userAuth, setUserAuth] = useState<boolean>(false);
  const value: AdminAuthContextProps = {
    adminAuth,
    userAuth,
    setUserAuth,
    setAdminAuth,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
