'use server'
import { redirect as redirectNext } from "next/navigation";

import { auth } from "@/lib/auth";

type GetUserCurrentSession = {
    redirect?: boolean 
}
export const getUserCurrentSession = async (opts?: GetUserCurrentSession ) => {
  const redirect = opts?.redirect ?? true
  try {

    const session = await auth()

    if (!session?.user) {
      return redirect ? redirectNext("/sign-in") : null
    }
        return session?.user;
  } catch (error) {
    console.error(error)
    return null
  }
}