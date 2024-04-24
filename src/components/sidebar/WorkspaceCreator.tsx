"use client";

import { User } from "@/lib/supabase/supabase.types";
import { useSupabaseUser } from "@/providers/SupabaseUserProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Lock, Share } from "lucide-react";

const WorkspaceCreator = () => {
  const { user } = useSupabaseUser();
  const router = useRouter();

  const [permissions, setPermissions] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);

  const addCollaborator = (user: User) => {
    setCollaborators([...collaborators, user]);
  };

  const removeCollaborator = (user: User) => {
    setCollaborators(collaborators.filter((c) => c.id !== user.id));
  };
  return (
    <div className="flex gap-4 flex-col">
      <div>
        <Label htmlFor="name" className="text-sm text-muted-foreground">
          Name
        </Label>
        <div className="flex justify-center items-center gap-2">
          <Input
            name="name"
            value={title}
            placeholder="Workspace Name"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <>
        <Label htmlFor="permissions" className="text-sm text-muted-foreground">
          Permission
        </Label>
        <Select
          onValueChange={(val) => setPermissions(val)}
          defaultValue={permissions}
        >
          <SelectTrigger className="w-full h-20 -mt-3">
            <SelectValue />
            <SelectContent>
              <SelectGroup>
                <SelectItem value="private">
                  <div className="p-2 flex gap-4 justify-center items-center">
                    <Lock />
                    <article className="text-left flex flex-col">
                      <span>Private</span>
                      <p>
                        Your workspace is private to you.
                      </p>
                    </article>
                  </div>
                </SelectItem>
                <SelectItem value="shared">
                  <div className="p-2 flex gap-4 justify-center items-center">
                    <Share />
                    <article className="text-left flex flex-col">
                      <span>Shared</span>
                      <p>
                        Your workspace is private to you.
                      </p>
                    </article>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </>
    </div>
  );
};

export default WorkspaceCreator;
