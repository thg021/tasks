//TODO: delete this file
import 'server-only';
import { Client, Account, Databases } from 'node-appwrite';
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    }
  };
}

export const getClientAPPWRITE = () =>  new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  export const servicesAPPWRITE = (session: string) => {
    const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
  
    client.setSession(session);
    return {
      get account() {
        return new Account(client);
      },
      get database() {
        return new Databases(client);
      }
    };
  }; 