"use client";
import {
  appFoldersType,
  appWorkspacesType,
  useAppState,
} from "@/lib/providers/state-provider";
import { Folder, workspace } from "@/lib/supabase/supabase.types";
import { UploadBannerFormSchema } from "@/lib/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  updateFile,
  updateFolder,
  updateWorkspace,
} from "@/lib/supabase/queries";
import { Loader } from "lucide-react";

interface BannerUploadFormProps {
  dirType: "workspace" | "file" | "folder";
  id: string;
}

const BannerUploadForm: React.FC<BannerUploadFormProps> = ({ dirType, id }) => {
  const supabase = createClientComponentClient();
  const { state, workspaceId, folderId, dispatch } = useAppState();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isUploading, errors },
  } = useForm<z.infer<typeof UploadBannerFormSchema>>({
    mode: "onChange",
    defaultValues: {
      banner: "",
    },
  });
  const onSubmitHandler: SubmitHandler<
    z.infer<typeof UploadBannerFormSchema>
  > = async (values) => {
    const file = values.banner?.[0];
    if (!file || !id) return;
    try {
      let filePath = null;

      const uploadBanner = async () => {
        const { data, error } = await supabase.storage
          .from("file-banners")
          .upload(`banner-${id}`, file, { cacheControl: "5", upsert: true });
        if (error) throw new Error();
        filePath = data.path;
      };
      if (dirType === "file") {
        if (!workspaceId || !folderId) return;
        await uploadBanner();
        dispatch({
          type: "UPDATE_FILE",
          payload: {
            file: { bannerUrl: filePath },
            fileId: id,
            folderId,
            workspaceId,
          },
        });
        await updateFile({ bannerUrl: filePath }, id);
      } else if (dirType === "folder") {
        if (!workspaceId || !folderId) return;
        await uploadBanner();
        dispatch({
          type: "UPDATE_FOLDER",
          payload: {
            folderId: id,
            folder: { bannerUrl: filePath },
            workspaceId,
          },
        });
        await updateFolder({ bannerUrl: filePath }, id);
      } else if (dirType === "workspace") {
        if (!workspaceId) return;
        await uploadBanner();
        dispatch({
          type: "UPDATE_WORKSPACE",
          payload: {
            workspace: { bannerUrl: filePath },
            workspaceId,
          },
        });
        await updateWorkspace({ bannerUrl: filePath }, id);
      }
    } catch (error) {}
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-2"
    >
      <Label className="text-sm text-muted-foreground" htmlFor="bannerImage">
        Banner Image
      </Label>
      <Input
        id="bannerImage"
        type="file"
        accept="image/*"
        disabled={isUploading}
        {...register("banner", { required: "Banner Image is required" })}
        onChange={handleFileChange}
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          style={{ maxWidth: "100%", maxHeight: "230px", objectFit: "cover" }}
        />
      )}
      <small className="text-red-600">
        {errors.banner?.message?.toString()}
      </small>
      <Button disabled={isUploading} type="submit">
        Upload Banner
        {!isUploading ? null : <Loader className="h-4 w-4 animate-spin ml-2" />}
      </Button>
    </form>
  );
};

export default BannerUploadForm;
