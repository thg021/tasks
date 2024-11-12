'use server'

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { servicesAPPWRITE } from "@/lib/appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { Query } from "node-appwrite";
import { map, size } from "lodash";
import { getWorkspacesById } from "./services";

/**
 * Retrieves the workspaces that the current user is a member of.
 * 
 * @returns An object containing the data and total count of the user's workspaces.
 */
export const getWorkspaces = async () => {
  try {
    const session = await cookies().get(AUTH_COOKIE)
    if (!session) {
      return {
        data: [],
        total: 0,
      }
    }
    
    const { database, account } = servicesAPPWRITE(session.value)
    const user = await account.get()
    // const members = await database.listDocuments(DATABASE_ID, MEMBERS_ID, [
    //   Query.equal("userId", user.$id)
    // ])
    const workspaces = await getWorkspacesById(user.$id);


    if(size(workspaces) === 0) {
      return {
        data: [],
        total: 0,
      }
    }
  
    // const workspaceIds = map(members.documents, (member) => member.workspaceId);
  
    // const workspaces = await database.listDocuments(DATABASE_ID, WORKSPACE_ID, [
    //   Query.orderDesc("$createdAt"),
    //   Query.contains("$id", workspaceIds),
    // ]);
  
    return {
      data: workspaces,
      total: size(workspaces)
    }
  } catch (error) {
    console.error(error)
    return {
      data: [],
      total: 0,
    }
  }
  
}