import React, { useEffect } from 'react';
import { signUp, auth, createUserDocument } from "./utils/firebase"

import { User as UserObj } from "@firebase/auth-types"

function App() {
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(
  //     async (user: UserObj | null): Promise<void> => {
  //       console.log(user)

  //       if (!user) return

  //       const userRef = await createUserDocument(user)

  //       console.log(userRef)

  //       if (!userRef) return

  //       userRef.onSnapshot((snapShot) => {
  //         console.log(snapShot)
  //       })

  //       const userData = user ? {
  //         email: user.email || "",
  //         displayName: user.displayName || "",
  //         isVerified: user.emailVerified,
  //       } : null
  //     }
  //   )
    
  //   return unsubscribe
  // }, [])

  return (
    <div>
    </div>
  );
}

export default App;
