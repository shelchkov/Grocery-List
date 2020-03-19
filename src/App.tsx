import React, { ReactElement } from 'react';
import { Button } from "./components/button/button"

import { BtnTypes } from "./utils/enums"

// import { signUp, auth, createUserDocument } from "./utils/firebase"

// import { User as UserObj } from "@firebase/auth-types"

const App = (): ReactElement => {
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
      <Button
        text="Add New Item"
        buttonType={BtnTypes.AddNewItem}
      />
    </div>
  );
}

export default App;
