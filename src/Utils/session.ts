import { useEffect, useContext } from 'react';

import { SESSION_ERROR } from 'Utils/constants';
import { SessionContext } from '../App';

const useSession = (loadings: any, errors: any) => {
  const { setIsOpen } = useContext(SessionContext);

  useEffect(() => {
    const sessionError = errors.some((error: any) => error?.message === SESSION_ERROR);
    if (
      sessionError ||
      !localStorage.getItem('token') ||
      !localStorage.getItem('company') ||
      !localStorage.getItem('email') ||
      !localStorage.getItem('user')
    )
      setIsOpen(true);
  }, [...loadings]);
};

export default useSession;
