import { configureStore } from '@reduxjs/toolkit';

import user from './user/user.slice';
import files from './files/files.slice';
import documents from './documents/documents.slice';
import vehicles from './vehicle/vehicle.slice';
import comments from './comment/comment.slice';
import booking from './booking/booking.slice';

export default configureStore({
  reducer: { user, files, documents, vehicles, comments, booking },
});
