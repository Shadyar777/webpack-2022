import React, { FC, useState } from 'react'
import { SignInParams } from '@/modules/auth/types/types'
import { useAppDispatch } from '@/store/hooks'
// import { signIn } from '@/modules/auth/slices/auth'

const SignIn: FC = () => {
  const [state, setState] = useState<SignInParams>({
    username: '',
    password: ''
  })
  const dispatch = useAppDispatch()

  const onFinish = () => {
    console.log('dispatch', dispatch)
    // dispatch(signIn(state))
  }

  return (
    <div>
      <input
        type='text'
        onChange={event => {
          setState({ ...state, username: event.target.value })
        }}
      />
      <input
        type='text'
        onChange={event => {
          setState({ ...state, password: event.target.value })
        }}
      />
      <input type='button' onClick={onFinish} />
    </div>
  )
}

export default SignIn
