import React, { ReactElement, useEffect, useState } from 'react'

import { MainPage } from "./pages/main.page"
import { LoginPage } from "./pages/login.page"

import { signUp, auth } from "./utils/firebase"

import { User as UserObj } from "@firebase/auth-types"

const App = (): ReactElement => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (user: UserObj | null): Promise<void> => {
        if (!user) return

        const userData = user ? {
          id: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          isVerified: user.emailVerified,
        } : null

        setUser(userData)
      }
    )


    return unsubscribe
  }, [])

  return (
    <>
      {user ? <MainPage user={user} /> : <LoginPage />}
    </>
  )
}

export default App;
