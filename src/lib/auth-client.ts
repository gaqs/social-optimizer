import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  session:{
    cookieCache:{
      enabled: true,
      maxAge: 60 * 5,
    }
  }
})

// Exportas lo que vas a usar en los componentes
export const { signIn, signOut, signUp, useSession } = authClient