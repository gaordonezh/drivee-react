import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import type { Action, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import server from '@/server';

interface UserSliceState {
  counter: number;
  user: {
    loading: boolean;
    docs: Array<Record<string, string>>;
  };
}

const initialState: UserSliceState = {
  counter: 0,
  user: {
    loading: false,
    docs: [],
  },
};

const incrementBy = createAction<number>('incrementBy')
const decrement = createAction('decrement')
interface RejectedAction extends Action {
  error: Error
}
function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}

export const testRequest = createAsyncThunk('user/testRequest', async (params: { code: string }, thunkAPI) => {
  try {
    const response = await server({
      method: 'get',
      url: '/monedas',
      params,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementByAmount(state, action: PayloadAction<number>) {
      state.counter += action.payload;
    },
  },
  // extraReducers: {
  //   /* GET USERS ACTIONS */
  //   [String(testRequest.pending)]: (state) => {
  //     state.user.loading = true;
  //     state.user.docs = [];
  //   },
  //   [String(testRequest.fulfilled)]: (state, action) => {
  //     state.user = { loading: false, docs: action.payload };
  //   },
  //   [String(testRequest.rejected)]: (state) => {
  //     state.user.loading = false;
  //     state.user.docs = [];
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(incrementBy, (state, action) => {
        // action is inferred correctly here if using TS
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(decrement, (state, action) => {})
      // You can match a range of action types
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {}
      )
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {});
  },
});

export const { incrementByAmount } = userSlice.actions;
export default userSlice.reducer;
