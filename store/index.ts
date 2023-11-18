import { configureStore } from '@reduxjs/toolkit';

import user from './user/user.slice';

export default configureStore({
  reducer: { user },
});
