import axios, { AxiosInstance } from 'axios'
import AxiosInterceptors from '@/store/configureStore/middleware/api/interceptors'
import { auth, logout } from '@/modules/auth/slices/credentials'
import {AppDispatch, RootState} from '@/store/configureStore/configureStore'

interface IInstanceProps {
  dispatch: AppDispatch
  getState: () => RootState
}

export default ({ dispatch, getState }: IInstanceProps | any): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL
  })

  const axiosInterceptors = new AxiosInterceptors(instance)

  instance.interceptors.request.use(
    axiosInterceptors.onRequestSuccess(getState),
    axiosInterceptors.onRequestError()
  )

  instance.interceptors.response.use(
    axiosInterceptors.onResponseSuccess(),
    axiosInterceptors.onResponseError(
      getState,
      token => dispatch(auth(token)),
      () => dispatch(logout())
    )
  )

  return instance
}
