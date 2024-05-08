import React from "react";
import CustomDialogTrigger from "../global/CustomDialogTrigger";
import BannerUploadForm from "./BannerUploadForm";

interface BannerUploadProps {
  details: {
    id: string;
    data: string | null;
    createdAt: string;
    title: string;
    iconId: string;
    inTrash: string | null;
    bannerUrl: string | null;
    workspaceId: string;
  };
  id: string;
  dirType: "workspace" | "file" | "folder";
  className: string;
  children: React.ReactNode;
}

const BannerUpload: React.FC<BannerUploadProps> = ({
  details,
  id,
  dirType,
  children,
  className,
}) => {
  return (
    <CustomDialogTrigger
      header="Upload Banner"
      content={<BannerUploadForm dirType={dirType} id={id} />}
      className={className}
    >
      {children}
    </CustomDialogTrigger>
  );
};

export default BannerUpload;
