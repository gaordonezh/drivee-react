import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import server from '@/server';
import { CreatePasswordBodyProps, CreateUserBodyProps, ValidateUserBodyProps } from './user';
import { RequestStatusEnum } from '@/interfaces/global.enum';

const initialState = {
  createPasswordState: RequestStatusEnum.IDLE,
  validateUserState: RequestStatusEnum.IDLE,
  createUserState: RequestStatusEnum.IDLE,
};

export const createPassword = createAsyncThunk('user/createPassword', async (body: CreatePasswordBodyProps, thunkAPI) => {
  try {
    const response = await server.post('users/create-password', body);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const validateUser = createAsyncThunk('user/validateUser', async (body: ValidateUserBodyProps, thunkAPI) => {
  try {
    const response = await server.post('users/validate', body);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createUser = createAsyncThunk('user/createUser', async (body: CreateUserBodyProps, thunkAPI) => {
  try {
    const response = await server.post('users', body);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetPasswordState(state, action: PayloadAction<number>) {
      console.log(state, action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(String(createPassword.pending), (state) => {
        state.createPasswordState = RequestStatusEnum.PENDING;
      })
      .addCase(String(createPassword.fulfilled), (state) => {
        state.createPasswordState = RequestStatusEnum.SUCCESS;
        setTimeout(() => {
          window.location.href = '/auth/signin';
        }, 7000);
      })
      .addCase(String(createPassword.rejected), (state) => {
        state.createPasswordState = RequestStatusEnum.ERROR;
      })

      .addCase(String(validateUser.pending), (state) => {
        state.validateUserState = RequestStatusEnum.PENDING;
      })
      .addCase(String(validateUser.fulfilled), (state) => {
        state.validateUserState = RequestStatusEnum.SUCCESS;
      })
      .addCase(String(validateUser.rejected), (state) => {
        state.validateUserState = RequestStatusEnum.ERROR;
      })

      .addCase(String(createUser.pending), (state) => {
        state.createUserState = RequestStatusEnum.PENDING;
      })
      .addCase(String(createUser.fulfilled), (state) => {
        state.createUserState = RequestStatusEnum.SUCCESS;
      })
      .addCase(String(createUser.rejected), (state) => {
        state.createUserState = RequestStatusEnum.ERROR;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
