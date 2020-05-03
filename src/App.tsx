import React, { ReactElement } from 'react'

import { LoadingPage } from "./pages/loading.page"
import { LoginPage } from "./pages/login.page"
import { MainPage } from "./pages/main.page"

import { useAuth } from "./effects/use-auth.effect"

const App = (): ReactElement => {
  const { user, clearUser } = useAuth()

  if (user === undefined) {
    return <LoadingPage />
  }

  if (user === null) {
    return <LoginPage />
  }

  return (
    <MainPage user={user} clearUser={clearUser} />
  )
}

export default App;
