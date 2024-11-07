'use server'

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "./constants";
import { accountAPPWRITE } from "@/lib/appwrite";

export const getCurrent = async () => {
  try {
    const session = await cookies().get(AUTH_COOKIE)
    if (!session) {
      return null
    }
    
    const { account } = accountAPPWRITE(session.value)
    return await account.get()
  } catch (error) {
    console.error(error)
    return null
  }
  
}