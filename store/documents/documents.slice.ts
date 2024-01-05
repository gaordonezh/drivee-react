import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '@/server';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { AuxDocumentProps, CreateDocumentProps, DocumentProps, GetDocumentsFilterProps, UpdateDocumentProps } from './documents';
import { DocumentStatusEnum, DocumentTypesEnum, PersonalDocumentTypesEnum, VehicleDocumentTypesEnum } from './documents.enum';
import { DOCUMENT_TYPES_TRANSLATE } from '@/utils/translate';
import { objectCleaner } from '@/utils/functions';

const initialState = {
  createDocumentStatus: RequestStatusEnum.IDLE,
  documents: {
    status: RequestStatusEnum.IDLE,
    docs: [] as Array<DocumentProps>,
  },
  auxDocuments: [] as Array<AuxDocumentProps>,
};

export const getDocuments = createAsyncThunk('document/getDocuments', async (params: GetDocumentsFilterProps, thunkAPI) => {
  try {
    const response = await server.get('documents', { params: { ...params, limit: 100 } });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createDocument = createAsyncThunk('document/createDocument', async (data: CreateDocumentProps, thunkAPI) => {
  try {
    const response = await server.post('documents', data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateDocument = createAsyncThunk(
  'document/updateDocument',
  async ({ docId, data }: { docId: string; data: UpdateDocumentProps }, thunkAPI) => {
    try {
      const response = await server.put(`documents/${docId}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(String(getDocuments.pending), (state) => {
        state.documents = { status: RequestStatusEnum.PENDING, docs: [] };
      })
      .addCase(String(getDocuments.fulfilled), (state, action) => {
        // @ts-ignore
        const kind = action.meta.arg.kind;
        const documentList = kind ? Object.values(kind === 'personal' ? PersonalDocumentTypesEnum : VehicleDocumentTypesEnum) : [];
        // @ts-ignore
        const existDocs: Array<DocumentProps> = action.payload.docs;
        const aux = documentList.map((type: DocumentTypesEnum) => {
          const finder = existDocs.find((item) => item.type === type);
          return objectCleaner({
            type,
            title: DOCUMENT_TYPES_TRANSLATE[type],
            status: finder?.status ?? DocumentStatusEnum.PENDING,
            _id: finder?._id,
            comment: finder?.comment,
          });
        });
        state.auxDocuments = aux;
        // @ts-ignore
        state.documents = { status: RequestStatusEnum.IDLE, ...(action.payload || {}) };
      })
      .addCase(String(getDocuments.rejected), (state) => {
        state.documents = { status: RequestStatusEnum.ERROR, docs: [] };
      })

      .addCase(String(createDocument.pending), (state) => {
        state.createDocumentStatus = RequestStatusEnum.PENDING;
      })
      .addCase(String(createDocument.fulfilled), (state) => {
        state.createDocumentStatus = RequestStatusEnum.SUCCESS;
      })
      .addCase(String(createDocument.rejected), (state) => {
        state.createDocumentStatus = RequestStatusEnum.ERROR;
      })

      .addCase(String(updateDocument.pending), (state) => {
        state.createDocumentStatus = RequestStatusEnum.PENDING;
      })
      .addCase(String(updateDocument.fulfilled), (state) => {
        state.createDocumentStatus = RequestStatusEnum.SUCCESS;
      })
      .addCase(String(updateDocument.rejected), (state) => {
        state.createDocumentStatus = RequestStatusEnum.ERROR;
      });
  },
});

export default userSlice.reducer;
