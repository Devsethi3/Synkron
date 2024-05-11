import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import Settings from "../settings/Settings";
import Trash from "../trash/Trash";
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
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            bg-secondary/30
            p-2
            rounded-md
            hover:bg-secondary
            gap-2
          "
            href={`/dashboard/${myWorkspaceId}`}
          >
            <SynkronHomeIcon />
            <span>My Workspace</span>
          </Link>
        </li>

        <Settings>
          <li
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            bg-secondary/30
            p-2
            rounded-md
            gap-2
            cursor-pointer
            hover:bg-secondary
          "
          >
            <SynkronSettingsIcon />
            <span>Settings</span>
          </li>
        </Settings>

        <Trash>
          <li
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            bg-secondary/30
            hover:bg-secondary
            p-2
            rounded-md
            gap-2
          "
          >
            <SynkronTrashIcon />
            <span>Trash</span>
          </li>
        </Trash>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
