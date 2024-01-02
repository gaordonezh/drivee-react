import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '@/server';
import { RequestStatusEnum } from '@/interfaces/global.enum';

const initialState = {
  uploadFileState: RequestStatusEnum.IDLE,
};

export const uploadFile = createAsyncThunk('file/uploadFile', async (file: File, thunkAPI) => {
  try {
    const form = new FormData();
    form.append('file', file);
    const response = await server.post('files', form);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(String(uploadFile.pending), (state) => {
        state.uploadFileState = RequestStatusEnum.PENDING;
      })
      .addCase(String(uploadFile.fulfilled), (state) => {
        state.uploadFileState = RequestStatusEnum.SUCCESS;
      })
      .addCase(String(uploadFile.rejected), (state) => {
        state.uploadFileState = RequestStatusEnum.ERROR;
      });
  },
});

export default userSlice.reducer;
