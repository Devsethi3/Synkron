import { File, Folder, workspace } from "@/lib/supabase/supabase.types";
import { appFoldersType, appWorkspacesType } from "@/providers/StateProvider";
import React from "react";

interface BannerUploadProps {
  children: React.ReactNode;
  className?: string;
  dirType: "workspace" | "file" | "folder";
  id: string;
  details: appWorkspacesType | appFoldersType | File | workspace | Folder;
}

const BannerUpload: React.FC<BannerUploadProps> = ({
  children,
  dirType,
  className,
  details,
  id,
}) => {
  return <div>BannerUpload</div>;
};

export default BannerUpload;
