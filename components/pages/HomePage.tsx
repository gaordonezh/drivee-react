import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { useEffect } from 'react';
import { testRequest } from '@/store/user/user.slice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.user.user);

  // console.log(state);

  // useEffect(() => {
  //   dispatch(testRequest({ code: 'some' }));
  // }, []);

  return (
    <div>
      <h1>HOME PAGE</h1>
    </div>
  );
};

export default HomePage;
