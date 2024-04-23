"use client";

import EmojiPicker from "@/components/global/EmojiPicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Subscription } from "@/lib/supabase/supabase.types";
import { CreateWorkspaceFormSchema } from "@/lib/types";
import { AuthUser } from "@supabase/supabase-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: Subscription | null;
}

const DashbaordSetup: React.FC<DashboardSetupProps> = ({
  subscription,
  user,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState("🚀");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: "onChange",
    defaultValues: {
      logo: "",
      workspaceName: "",
    },
  });

  return (
    <Card className="w-[800px] sm:h-auto">
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started. You can add
          collaboration later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={() => {}}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">
                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </EmojiPicker>
              </div>

              <div className="w-full">
                <Label
                  htmlFor="workspaceName"
                  className="text-sm text-muted-foreground"
                >
                  Name
                </Label>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="Workspace Name"
                  disabled={isLoading}
                  {...register("workspaceName", {
                    required: "Workspace name is required",
                  })}
                />

                <small className="text-red-600">
                  {errors?.logo?.message?.toString()}
                </small>
              </div>
            </div>
            <div>
              <Label htmlFor="logo" className="text-sm text-muted-foreground">
                Workspace Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                placeholder="Workspace Logo"
                disabled={isLoading || subscription?.status !== "active"}
                {...register("logo", {
                  required: "Workspace Logo is required",
                })}
              />

              <small className="text-red-600">
                {errors?.logo?.message?.toString()}
              </small>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashbaordSetup;
