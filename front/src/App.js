import React, { useState, useEffect, useReducer, createContext } from 'react';
import * as Api from './api';
import RouterFile from './Router';
import { loginReducer } from './reducer';

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get('users');
      const currentUser = res.data;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: currentUser,
      });

      console.log('%c sessionStorage에 토큰 있음.', 'color: #d93d1a;');
    } catch {
      console.log('%c SessionStorage에 토큰 없음.', 'color: #d93d1a;');
    }
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return 'loading...';
  }

  return (
    <>
      <DispatchContext.Provider value={dispatch}>
        <UserStateContext.Provider value={userState}>
          <RouterFile />
        </UserStateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
}

export default App;
