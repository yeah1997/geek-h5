import React from 'react'

import { Route, Redirect, RouteProps } from 'react-router-dom'

import { hasToken } from '@/utils/storage'

/** Type */
interface Props extends RouteProps {
  component: React.ComponentType<any>
}

export default function AuthRoute({ component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (hasToken()) {
          return <Component></Component>
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: location } }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
