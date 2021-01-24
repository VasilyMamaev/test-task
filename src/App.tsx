import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';

import Main from './components/Main';
import { RootState, useAppDispatch } from './store';
import { getData } from './store/slices/docsSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

  useEffect(() => {
    dispatch(getData());
  }, []);

  return <Container maxWidth="md">{isInitialized && <Main />}</Container>;
};

export default App;
