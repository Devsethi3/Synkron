import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import SynkronHomeIcon from "../icons/SynkronHomeIcon";
import SynkronSettingsIcon from "../icons/SynkronSettingsIcon";
import SynkronTrashIcon from "../icons/SynkronTrashIcon";

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
        <li>
          <Link
            className="group/native flex text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer items-center"
            href={`/dashboard/${myWorkspaceId}`}
          >
            <SynkronHomeIcon />
            My Workspace
          </Link>
        </li>
        <li>
          <Link
            className="group/native flex text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer items-center"
            href={`/dashboard/${myWorkspaceId}`}
          >
            <SynkronSettingsIcon />
            Settings
          </Link>
        </li>
        <li>
          <Link
            className="group/native flex text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer items-center"
            href={`/dashboard/${myWorkspaceId}`}
          >
            <SynkronTrashIcon />
            Trash
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
