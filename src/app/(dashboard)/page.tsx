"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { first } from "lodash";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: workspaces, isLoading } = useGetWorkspaces();
  if (isLoading) return;
  if (workspaces && workspaces?.total === 0) {
    redirect("/workspaces/create");
  }

  const workspace = first(workspaces?.data);
  redirect(`/workspaces/${workspace?.id}`);
}
