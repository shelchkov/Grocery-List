import React, { ReactElement, useEffect } from 'react'

import { MainPage } from "./pages/main.page"

import { signUp, auth, createUserDocument } from "./utils/firebase"
import { getListItems, addListItem } from "./utils/firebase"

import { User as UserObj } from "@firebase/auth-types"



const App = (): ReactElement => {

  // useEffect((): void => {
  //   getListItems("7Q0YcCn2B0Hf0LqLT1a5").then(console.log)
  // }, [])

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(
  //     async (user: UserObj | null): Promise<void> => {
  //       console.log(user)

  //       if (!user) return

  //       // const userRef = await createUserDocument(user)

  //       // console.log(userRef)

  //       // if (!userRef) return

  //       // userRef.onSnapshot((snapShot) => {
  //       //   console.log(snapShot)
  //       // })

  //       const userData = user ? {
  //         id: user.uid,
  //         email: user.email || "",
  //         displayName: user.displayName || "",
  //         isVerified: user.emailVerified,
  //       } : null

  //       userData && getListItems(userData.id).then(
  //         (data?: { items?: Item[] }): void => {
  //         console.log(data)
          
  //         addListItem(
  //           { name: "oranges", isChecked: false },
  //           userData.id,
  //           data && data.items && data.items.length > 0
  //          ).then(console.log)
  //       })
  //     }
  //   )

    
    
  //   return unsubscribe
  // }, [])

  return (
      <MainPage />
  );
}

export default App;
