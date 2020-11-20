import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { VISUALIZATOR_USER, RESULTS_TEXT } from './constants';

const useNavigation = (visualizatorAllowed = false) => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem('token') || !localStorage.getItem('company')) history.push('/');
    else if (localStorage.getItem('user') === VISUALIZATOR_USER && !visualizatorAllowed)
      history.push(`/${RESULTS_TEXT}`);
  }, []);
};

export default useNavigation;
