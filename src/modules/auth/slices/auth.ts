
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SignInParams } from '@/modules/auth/types/types'
import { AxiosResponse } from 'axios'
import { AuthState, CredentialsState } from '@/modules/auth/types/interfaces'
import { auth } from '@/modules/auth/slices/credentials'
import {AppThunk, ThunkApiConfig} from '@/store/configureStore/configureStore'
import {instance} from '@/store/configureStore/middleware'

export const signIn: AppThunk<void, SignInParams> = createAsyncThunk<void, SignInParams, ThunkApiConfig>(
  'auth/sign_in',
  (body, thunkApi) =>
    instance(thunkApi)
      .post('/feedback/core/v1/users/login', body)
      .then((res: AxiosResponse<CredentialsState>) => {
        thunkApi.dispatch(auth(res.data))
      })
      .catch(err => {
        console.warn(err)
      })
)

/**
 * Reducer
 */

const initialState: AuthState = {
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(signIn.pending, state => {
        state.error = null
        state.loading = true
      })
      .addCase(signIn.fulfilled, state => {
        state.error = null
        state.loading = false
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.error = payload
        state.loading = false
      })
})

export default authSlice.reducer
