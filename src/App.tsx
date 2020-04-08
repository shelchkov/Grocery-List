import React, { ReactElement, useEffect, useState } from 'react'

import { MainPage } from "./pages/main.page"
import { LoginPage } from "./pages/login.page"

import { auth } from "./utils/firebase"

import { User as UserObj } from "@firebase/auth-types"

const App = (): ReactElement => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (user: UserObj | null): Promise<void> => {
        console.log(user)
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

  const clearUser = (): void => setUser(null)

  return (
    <>
      {user ?
        <MainPage user={user} clearUser={clearUser} />
      :
        <LoginPage />
      }
    </>
  )
}

export default App;
