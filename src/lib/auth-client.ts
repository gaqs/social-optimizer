import { createAuthClient } from 'better-auth/react'
import { customSessionClient } from 'better-auth/client/plugins'
import { auth } from '@/lib/auth'

// Sin baseURL, el cliente usa el mismo origen bajo /api/auth (no depende de
// NEXT_PUBLIC_APP_URL, que no está definida en este proyecto).
export const authClient = createAuthClient({
  plugins: [
    customSessionClient<typeof auth>()
  ]
})

// Exportas lo que vas a usar en los componentes
export const { signIn, signOut, signUp, useSession } = authClient
