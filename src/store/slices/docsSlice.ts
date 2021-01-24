import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch } from '../';
import { Document, DocumentParticipant, getFakeData } from '../../data';
import appSlice from './appSlice';

const docsSlice = createSlice({
  name: 'docs',
  initialState: {
    documents: [] as Document[],
    participants: [] as DocumentParticipant[],
    isSortBySign: false,
    searchValue: '',
    selectValue: '',
  },
  reducers: {
    setData: (state, action: PayloadAction<{ documents: Document[]; participants: DocumentParticipant[] }>) => {
      state.documents = action.payload.documents;
      state.participants = action.payload.participants;
    },
    signDoc: (state, action: PayloadAction<{ id: string }>) => {
      const serchableDocIndex = state.documents.findIndex((doc) => doc.id === action.payload.id);
      state.documents[serchableDocIndex] = { ...state.documents[serchableDocIndex], signedDate: new Date() };
    },
    setSortBySign: (state, action: PayloadAction<boolean>) => {
      state.isSortBySign = action.payload;
    },
    setSerchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSelectValue: (state, action: PayloadAction<string>) => {
      state.selectValue = action.payload;
    },
  },
});

export const getData = () => {
  return async (dispatch: AppDispatch) => {
    const response = await getFakeData();
    dispatch(docsSlice.actions.setData(response));
    dispatch(appSlice.actions.setAppInitialized());
  };
};

export default docsSlice;
