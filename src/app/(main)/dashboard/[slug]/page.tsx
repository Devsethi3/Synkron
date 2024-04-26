"use client"

interface WorkspacePageProps {
  params: string
}

const WorkspacePage:React.FC<WorkspacePageProps> = ({params}) => {
  console.log(params);
  
  return (
    <div>WorkspacePage</div>
  )
}

export default WorkspacePage