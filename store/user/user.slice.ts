import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import server from '@/server';
import {
  CreatePasswordBodyProps,
  CreateUserBodyProps,
  ForgotPasswordBodyProps,
  UpdatePasswordBodyProps,
  UpdateUserBodyProps,
  ValidateUserBodyProps,
} from './user';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { UserRolesEnum } from './user.enum';

const initialState = {
  createPasswordState: RequestStatusEnum.IDLE,
  validateUserState: RequestStatusEnum.IDLE,
  createUserState: RequestStatusEnum.IDLE,
  updateUserState: RequestStatusEnum.IDLE,
  updatePasswordState: RequestStatusEnum.IDLE,
  forgotPasswordState: RequestStatusEnum.IDLE,
};

export const createPassword = createAsyncThunk('user/createPassword', async (body: CreatePasswordBodyProps, thunkAPI) => {
  try {
    const response = await server.post('users/create-password', body);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const forgorPassword = createAsyncThunk('user/forgorPassword', async (body: ForgotPasswordBodyProps, thunkAPI) => {
  try {
    const response = await server.post('users/forgot-password', body);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updatePassword = createAsyncThunk('user/updatePassword', async (params: UpdatePasswordBodyProps, thunkAPI) => {
  try {
    const response = await server.put(`users/update-password/${params.userId}`, params.body);
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ body, user_id }: { body: UpdateUserBodyProps | { roles: Array<UserRolesEnum> }; user_id: string }, thunkAPI) => {
    try {
      const response = await server.put(`users/${user_id}`, body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetPasswordState(state, action: PayloadAction<number>) {},
    resetUpdateUserState(state) {
      state.updateUserState = RequestStatusEnum.IDLE;
      state.updatePasswordState = RequestStatusEnum.IDLE;
      state.forgotPasswordState = RequestStatusEnum.IDLE;
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
      })

      .addCase(String(updateUser.pending), (state) => {
        state.updateUserState = RequestStatusEnum.PENDING;
      })
      .addCase(String(updateUser.fulfilled), (state) => {
        state.updateUserState = RequestStatusEnum.SUCCESS;
      })
      .addCase(String(updateUser.rejected), (state) => {
        state.updateUserState = RequestStatusEnum.ERROR;
      })

      .addCase(String(updatePassword.pending), (state) => {
        state.updatePasswordState = RequestStatusEnum.PENDING;
      })
      .addCase(String(updatePassword.fulfilled), (state) => {
        state.updatePasswordState = RequestStatusEnum.SUCCESS;
      })
      .addCase(String(updatePassword.rejected), (state) => {
        state.updatePasswordState = RequestStatusEnum.ERROR;
      })

      .addCase(String(forgorPassword.pending), (state) => {
        state.forgotPasswordState = RequestStatusEnum.PENDING;
      })
      .addCase(String(forgorPassword.fulfilled), (state) => {
        state.forgotPasswordState = RequestStatusEnum.SUCCESS;
      })
      .addCase(String(forgorPassword.rejected), (state) => {
        state.forgotPasswordState = RequestStatusEnum.ERROR;
      });
  },
});

export const { resetUpdateUserState } = userSlice.actions;
export default userSlice.reducer;
