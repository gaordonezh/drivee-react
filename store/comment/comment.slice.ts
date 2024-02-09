import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '@/server';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { CommentProps, CreateCommentBodyProps, GetCommentsFilterProps } from './comment';

const initialState = {
  createCommentState: RequestStatusEnum.IDLE,
  comments: {
    status: RequestStatusEnum.IDLE,
    docs: [] as Array<CommentProps>,
  },
};

export const getComments = createAsyncThunk('comment/getComments', async (params: GetCommentsFilterProps, thunkAPI) => {
  try {
    const response = await server.get('comments', { params });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createComment = createAsyncThunk('comment/createComment', async (body: CreateCommentBodyProps, thunkAPI) => {
  try {
    const response = await server.post('comments', body);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(String(getComments.pending), (state) => {
        state.comments = { status: RequestStatusEnum.PENDING, docs: [] };
      })
      .addCase(String(getComments.fulfilled), (state, action) => {
        // @ts-ignore
        state.comments = { status: RequestStatusEnum.IDLE, ...(action.payload || {}) };
      })
      .addCase(String(getComments.rejected), (state) => {
        state.comments = { status: RequestStatusEnum.ERROR, docs: [] };
      })

      .addCase(String(createComment.pending), (state) => {
        state.createCommentState = RequestStatusEnum.PENDING;
      })
      .addCase(String(createComment.fulfilled), (state) => {
        state.createCommentState = RequestStatusEnum.IDLE;
      })
      .addCase(String(createComment.rejected), (state) => {
        state.createCommentState = RequestStatusEnum.ERROR;
      });
  },
});

// export const {} = commentSlice.actions;

export default commentSlice.reducer;
