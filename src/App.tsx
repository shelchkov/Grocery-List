import React, { ReactElement, useEffect, useState } from 'react'

import { MainPage } from "./pages/main.page"

import { signUp, auth, getListItems } from "./utils/firebase"

import { User as UserObj } from "@firebase/auth-types"

const App = (): ReactElement => {
  const [user, setUser] = useState<User | null>(null)

  // useEffect((): void => {
  //   getListItems("7Q0YcCn2B0Hf0LqLT1a5").then(console.log)
  // }, [])

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

        // userData && getListItems("RKIS9avcsuajAtOIyi7J").then(
        //   (data?: { items?: Item[] }): void => {
        //   console.log(data)
        // }))
      }
    )


    return unsubscribe
  }, [])

  return (
    <MainPage user={user} />
  )
}

export default App;
