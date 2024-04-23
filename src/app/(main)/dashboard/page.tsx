import db from "@/lib/supabase/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashbaordSetup from "./[workspaceId]/_components/DashbaordSetup";
import { getUserSubscriptionStatus } from "@/lib/supabase/queries";

const DashbaordPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  });

  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  if (subscriptionError) return;

  if (!workspace)
    return (
      <>
        <div className="bg-background h-[50vh] w-screen flex justify-center items-center">
          <DashbaordSetup
            subscription={subscription}
            user={user}
          ></DashbaordSetup>
        </div>
      </>
    );

  redirect(`/dashbaord/${workspace.id}`);
};

export default DashbaordPage;
