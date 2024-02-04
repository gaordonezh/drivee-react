import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '@/server';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { CreateVehicleBodyProps, GetPublicVehiclesFilterProps, GetVehiclesFilterProps, VehicleProps, updateVehicleBodyProps } from './vehicle';

type PublicVehiclesStateType = {
  status: RequestStatusEnum;
  docs: Array<VehicleProps>;
  next?: string;
  previous?: string;
  totalDocs: number;
};

const initialState = {
  createVehicleState: RequestStatusEnum.IDLE,
  updateVehicleState: RequestStatusEnum.IDLE,
  vehicles: {
    status: RequestStatusEnum.IDLE,
    docs: [] as Array<VehicleProps>,
  },
  publicVehicles: {
    status: RequestStatusEnum.IDLE,
    docs: [] as Array<VehicleProps>,
    totalDocs: 0,
  } as PublicVehiclesStateType,
};

export const getVehicles = createAsyncThunk('vehicle/getVehicles', async (params: GetVehiclesFilterProps, thunkAPI) => {
  try {
    const response = await server.get('vehicles', { params: { ...params, limit: 100 } });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getPublicVehicles = createAsyncThunk('vehicle/getPublicVehicles', async (params: GetPublicVehiclesFilterProps, thunkAPI) => {
  try {
    const response = await server.get('vehicles/list', { params });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createVehicle = createAsyncThunk('vehicle/createVehicle', async (body: CreateVehicleBodyProps, thunkAPI) => {
  try {
    const response = await server.post('vehicles', body);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateVehicle = createAsyncThunk(
  'vehicle/updateVehicle',
  async ({ id, body }: { id: string; body: updateVehicleBodyProps }, thunkAPI) => {
    try {
      const response = await server.put(`vehicles/${id}`, body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    resetVehicleStatus: (state) => {
      state.createVehicleState = RequestStatusEnum.IDLE;
      state.updateVehicleState = RequestStatusEnum.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(String(getVehicles.pending), (state) => {
        state.vehicles = { status: RequestStatusEnum.PENDING, docs: [] };
      })
      .addCase(String(getVehicles.fulfilled), (state, action) => {
        // @ts-ignore
        state.vehicles = { status: RequestStatusEnum.IDLE, ...(action.payload || {}) };
      })
      .addCase(String(getVehicles.rejected), (state) => {
        state.vehicles = { status: RequestStatusEnum.ERROR, docs: [] };
      })

      .addCase(String(createVehicle.pending), (state) => {
        state.createVehicleState = RequestStatusEnum.PENDING;
      })
      .addCase(String(createVehicle.fulfilled), (state) => {
        state.createVehicleState = RequestStatusEnum.SUCCESS;
      })
      .addCase(String(createVehicle.rejected), (state) => {
        state.createVehicleState = RequestStatusEnum.ERROR;
      })

      .addCase(String(updateVehicle.pending), (state) => {
        state.updateVehicleState = RequestStatusEnum.PENDING;
      })
      .addCase(String(updateVehicle.fulfilled), (state) => {
        state.updateVehicleState = RequestStatusEnum.SUCCESS;
      })
      .addCase(String(updateVehicle.rejected), (state) => {
        state.updateVehicleState = RequestStatusEnum.ERROR;
      })

      .addCase(String(getPublicVehicles.pending), (state) => {
        state.publicVehicles.status = RequestStatusEnum.PENDING;
        state.publicVehicles.docs = [];
      })
      .addCase(String(getPublicVehicles.fulfilled), (state, action) => {
        // @ts-ignore
        state.publicVehicles = { status: RequestStatusEnum.IDLE, ...(action.payload || {}) };
      })
      .addCase(String(getPublicVehicles.rejected), (state) => {
        state.publicVehicles.status = RequestStatusEnum.ERROR;
        state.publicVehicles.docs = [];
        state.publicVehicles.totalDocs = 0;
      });
  },
});

export const { resetVehicleStatus } = userSlice.actions;

export default userSlice.reducer;
