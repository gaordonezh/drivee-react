import { configureStore } from '@reduxjs/toolkit';

import user from './user/user.slice';
import files from './files/files.slice';
import documents from './documents/documents.slice';

export default configureStore({
  reducer: { user, files, documents },
});
