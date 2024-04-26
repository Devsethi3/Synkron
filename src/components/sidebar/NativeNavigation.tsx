import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

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
      <ul className="flex flex-col">
        <li>
          <Link
            className="group/native flex text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer"
            href={`/dashboard/${myWorkspaceId}`}
          >
            My Workspace
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
