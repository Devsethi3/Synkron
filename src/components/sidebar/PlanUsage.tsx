"use client";

import { MAX_FOLDERS_FREE_PLAN } from "@/lib/constant";
import { Subscription } from "@/lib/supabase/supabase.types";
import { useAppState } from "@/providers/StateProvider";
import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

interface PlanUsageProps {
  foldersLength: number;
  subscription: Subscription | null;
}
const PlanUsage: React.FC<PlanUsageProps> = ({
  foldersLength,
  subscription,
}) => {
  const { workspaceId, state } = useAppState();
  const [usagePercentage, setUsagePercentage] = useState(
    (foldersLength / MAX_FOLDERS_FREE_PLAN) * 100
  );

  useEffect(() => {
    const stateFoldersLength = state.workspaces.find(
      (workspace) => workspace.id === workspaceId
    )?.folders.length;

    if (stateFoldersLength === undefined) return;

    setUsagePercentage((stateFoldersLength / MAX_FOLDERS_FREE_PLAN) * 100);
  }, []);

  return (
    <article className="mb-4">
      {subscription?.status !== "active" && (
        <div className="flex gap-2 text-sm font-medium mb-2 items-center">
          <div className="h-4 w-4"></div>
          <div className="flex justify-between w-full items-center">
            <p>Free Plan</p>
            <small>{usagePercentage.toFixed(0)}% / 100%</small>
          </div>
        </div>
      )}

      {subscription?.status !== "active" && (
        <Progress value={30} className="h-2" />
      )}
    </article>
  );
};

export default PlanUsage;
