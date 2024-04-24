"use client";

import { workspace } from "@/lib/supabase/supabase.types";
import { useAppState } from "@/providers/StateProvider";
import { useEffect, useState } from "react";
import SelectedWorkspace from "./SelectedWorkspace";
import CustomDialogTrigger from "../global/CustomDialogTrigger";
import WorkspaceCreator from "./WorkspaceCreator";

interface WorkspaceDropdownProps {
  privateWorkspaces: workspace[] | [];
  sharedWorkspaces: workspace[] | [];
  collaboratingWorkspaces: workspace[] | [];
  defaultValue: workspace | undefined;
}

const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({
  privateWorkspaces,
  sharedWorkspaces,
  collaboratingWorkspaces,
  defaultValue,
}) => {
  const { dispatch, state } = useAppState();
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({ ...workspace, folders: [] })),
        },
      });
    }
  }, [
    privateWorkspaces,
    collaboratingWorkspaces,
    sharedWorkspaces,
    dispatch,
    state.workspaces.length,
  ]);

  const handleSelect = (option: workspace) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <span onClick={() => setIsOpen(!isOpen)}>
            {selectedOption ? (
              <SelectedWorkspace workspace={selectedOption} />
            ) : (
              ""
            )}
          </span>
        </div>
        {isOpen && (
          <div
            className="origin-top-right
          absolute
          w-full
          rounded-md
          shadow-md
          z-50
          h-[190px]
          bg-black/10
          backdrop-blur-lg
          group
          overflow-scroll
          border-[1px]
          border-muted"
          >
            <div className="rounded-md flex flex-col">
              <div className="!p-2">
                {!!privateWorkspaces.length && (
                  <>
                    <p className="text-muted-foreground">Private</p>
                    <hr />
                    {privateWorkspaces.map((option) => (
                      <SelectedWorkspace
                        key={option.id}
                        workspace={option}
                        onClick={handleSelect}
                      />
                    ))}
                  </>
                )}
                {!!sharedWorkspaces.length && (
                  <>
                    <p className="text-muted-foreground">Shared</p>
                    <hr />
                    {sharedWorkspaces.map((option) => (
                      <SelectedWorkspace
                        key={option.id}
                        workspace={option}
                        onClick={handleSelect}
                      />
                    ))}
                  </>
                )}
                {!!collaboratingWorkspaces.length && (
                  <>
                    <p className="text-muted-foreground">Collaborating</p>
                    <hr />
                    {collaboratingWorkspaces.map((option) => (
                      <SelectedWorkspace
                        key={option.id}
                        workspace={option}
                        onClick={handleSelect}
                      />
                    ))}
                  </>
                )}
              </div>
              <CustomDialogTrigger
                header="Create A Workspace"
                content={<WorkspaceCreator />}
                description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
              >
                <div
                  className="flex 
              transition-all 
              hover:bg-muted 
              justify-center 
              items-center 
              gap-2 
              p-2 
              w-full"
                >
                  <article
                    className="text-slate-500 
                rounded-full
                 bg-slate-800 
                 w-4 
                 h-4 
                 flex 
                 items-center 
                 justify-center"
                  >
                    +
                  </article>
                  Create workspace
                </div>
              </CustomDialogTrigger>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkspaceDropdown;
