// appSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { INotifyOptions } from '@/utils/hooks/useNotify'

interface AppState {
  notification: INotifyOptions | null
}

const initialState: AppState = {
  notification: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showNotify: (state, action: PayloadAction<INotifyOptions>) => {
      state.notification = action.payload
    },
    hideNotify: (state) => {
      state.notification = null
    },
  },
})

const appReducer = appSlice.reducer
export const { showNotify, hideNotify } = appSlice.actions
export default appReducer
