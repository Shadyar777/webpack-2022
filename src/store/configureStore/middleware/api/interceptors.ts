/* tslint:disable */
import { AxiosError, AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import {CredentialsState} from '@/modules/auth/types/interfaces'
import {RootState} from '@/store/configureStore/configureStore'

class AxiosInterceptors {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  onRequestSuccess(getState: () => RootState) {
    return function (config: AxiosRequestConfig): AxiosRequestConfig {
      const accessToken = getState().authModule.credentials.accessToken

      // @ts-ignore
      if (config.url.indexOf('refresh') >= 0) {
        return config
      }

      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: 'Bearer ' + accessToken
        }
      }
    }
  }

  onRequestError() {
    return function (error: AxiosError): Promise<AxiosError> {
      // eslint-disable-next-line no-console
      console.log(error)
      return Promise.reject(error)
    }
  }

  onResponseSuccess() {
    return function (response: AxiosResponse): AxiosResponse {
      return response
    }
  }

  onResponseError(
    getState: () => RootState,
    // eslint-disable-next-line no-unused-vars
    onAuthCb: (credentials: CredentialsState) => any,
    onLogoutCb: VoidFunction
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ctx = this
    const refreshUrl = '/feedback/core/v1/users/refresh'

    return function (error: {
      response: { status: number }
      toJSON: () => any
      config: { url: string }
    }) {
      // eslint-disable-next-line no-console
      console.log(error)

      // error without response when problem cors
      if (!error.response) {
        return Promise.reject({
          ...error.toJSON(),
          response: {
            data: {
              error: {
                message: 'Blocked by CORS policy'
              }
            }
          }
        })
      }

      if (error.response.status !== 401 && error.config.url !== refreshUrl) {
        return Promise.reject(error)
      }

      // Logout user if token refresh didn't work or user is disabled
      if (error.config.url === refreshUrl) {
        onLogoutCb()

        return Promise.reject(error)
      }

      // Try request again with new token
      const token = getState().authModule.credentials
      const body = {
        refreshToken: token.refreshToken
      }

      return ctx.instance
        .post(refreshUrl, body)
        .then(({ data }) => {
          const config = error.config


          // @ts-ignore
          onAuthCb(data)

          (config as any).headers['Authorization'] = `Bearer ${data.accessToken}`

          return new Promise((resolve, reject) => {
            ctx.instance
              .request(config)
              .then(res => resolve(res))
              .catch(err => reject(err.toJSON))
          })
        })
        .catch(err => Promise.reject(err.toJSON()))
    }
  }
}

export default AxiosInterceptors
