import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";

export const AppStateContext = createContext(null);

export default function AppStateProvider(props) {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [isAuthReady, setAuthReady] = useState(false);

  const updateUserFromAPI = useCallback(() => {
    return fetch("/api/v1/me").then((resp) => {
      if (resp.status === 200) {
        return resp.json().then((user) => {
          setUser(user);
          onChooseAccount(user.accounts[0]);
        });
      }
    });
  }, []);

  useEffect(() => {
    updateUserFromAPI().finally(() => setAuthReady(true));
  }, [updateUserFromAPI]);

  const onLogout = () => {
    setUser(null);
    onChooseAccount(null);
  };

  const onLogin = () => updateUserFromAPI();

  const onChooseAccount = (newAccount) => {
    localStorage.setItem(
      "account_id",
      newAccount ? JSON.stringify(newAccount.id) : null
    );
    setAccount(newAccount);
  };

  const contextValue = {
    user,
    isAuthReady,
    onLogin,
    onLogout,
    account,
    onChooseAccount,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {props.children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext);
