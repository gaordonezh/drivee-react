import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '@/server';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { BookingProps, CreateBookingBodyProps, GetBookingBodyProps } from './booking';

type BookingStateType = {
  status: RequestStatusEnum;
  docs: Array<BookingProps>;
  totalDocs: number;
  next?: string;
  previous?: string;
};

const initialState = {
  requestBookingState: RequestStatusEnum.IDLE,
  data: {
    status: RequestStatusEnum.IDLE,
    docs: [],
    totalDocs: 0,
  } as BookingStateType,
};

export const getBooking = createAsyncThunk('booking/getBooking', async (params: GetBookingBodyProps, thunkAPI) => {
  try {
    const response = await server.get('booking', { params });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createBooking = createAsyncThunk('booking/createBooking', async (body: CreateBookingBodyProps, thunkAPI) => {
  try {
    const response = await server.post('booking', body);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.requestBookingState = RequestStatusEnum.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(String(getBooking.pending), (state) => {
        state.data = { status: RequestStatusEnum.PENDING, docs: [], totalDocs: 0 };
      })
      .addCase(String(getBooking.fulfilled), (state, action) => {
        // @ts-ignore
        state.data = { status: RequestStatusEnum.IDLE, ...(action.payload || {}) };
      })
      .addCase(String(getBooking.rejected), (state) => {
        state.data = { status: RequestStatusEnum.ERROR, docs: [], totalDocs: 0 };
      })

      .addCase(String(createBooking.pending), (state) => {
        state.requestBookingState = RequestStatusEnum.PENDING;
      })
      .addCase(String(createBooking.fulfilled), (state, action) => {
        // @ts-ignore
        state.requestBookingState = action.payload.success ? RequestStatusEnum.SUCCESS : RequestStatusEnum.ERROR;
      })
      .addCase(String(createBooking.rejected), (state) => {
        state.requestBookingState = RequestStatusEnum.ERROR;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;

export default bookingSlice.reducer;
