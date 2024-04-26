import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from "@/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import WorkspaceDropdown from "./WorkspaceDropdown";
import PlanUsage from "./PlanUsage";
import NativeNavigation from "./NativeNavigation";

interface SidebarProps {
  params: { workspaceId: string };
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = async ({ params, className }) => {
  const supabase = createServerComponentClient({ cookies });
  //user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  //subscr
  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  //folders
  const { data: workspaceFolderData, error: foldersError } = await getFolders(
    params.workspaceId
  );
  //error
  if (subscriptionError || foldersError) redirect("/dashboard");

  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  return (
    <aside
      className={twMerge(
        "hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4",
        className
      )}
    >
      <WorkspaceDropdown
        privateWorkspaces={privateWorkspaces}
        collaboratingWorkspaces={collaboratingWorkspaces}
        sharedWorkspaces={sharedWorkspaces}
        defaultValue={[
          ...privateWorkspaces,
          ...collaboratingWorkspaces,
          ...sharedWorkspaces,
        ].find((workspace) => workspace.id === params.workspaceId)}
      />
      <PlanUsage
        foldersLength={workspaceFolderData?.length || 0}
        subscription={subscriptionData}
      />
      <NativeNavigation myWorkspaceId={params.workspaceId} />
    </aside>
  );
};

export default Sidebar;
