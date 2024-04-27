import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import SynkronHomeIcon from "../icons/SynkronHomeIcon";
import SynkronSettingsIcon from "../icons/SynkronSettingsIcon";
import SynkronTrashIcon from "../icons/SynkronTrashIcon";
import Settings from "../settings/Settings";

interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
}

const NativeNavigation: React.FC<NativeNavigationProps> = ({
  myWorkspaceId,
  className,
}) => {
  return (
    <nav className={twMerge("my-2", className)}>
      <ul className="flex flex-col gap-2">
        <li
          className="group/native flex text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer items-center"
        >
          <SynkronHomeIcon />
          My Workspace
        </li>
        <Settings>
          <li
            className="group/native flex text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer items-center"
          >
            <SynkronSettingsIcon />
            Settings
          </li>
        </Settings>
        <li
          className="group/native flex text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer items-center"
        >
          <SynkronTrashIcon />
          Trash
        </li>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
