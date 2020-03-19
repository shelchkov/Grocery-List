import React, { ReactElement } from 'react'
import { Button } from "./components/button/button"
import { Logo } from "./components/logo/logo"

import styled from "styled-components"
import { BtnTypes } from "./utils/enums"
import { spaces, colors } from "./utils/styles"

// import { signUp, auth, createUserDocument } from "./utils/firebase"

// import { User as UserObj } from "@firebase/auth-types"

const Container = styled.div`
  padding-left: ${spaces[1]};
  padding-right: ${spaces[1]};

  background-color: ${colors.grey};
`

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
      <Container>
        <Logo />
        <Button
          text="Add New Item"
          buttonType={BtnTypes.AddNewItem}
        />
      </Container>
    </div>
  );
}

export default App;
