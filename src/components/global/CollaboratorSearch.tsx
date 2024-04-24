"use client";
import { User } from "@/lib/supabase/supabase.types"
import { useRef, useState } from "react";

interface CollaboratorSearchProps {
    existingCollaborators: User[] |[];
    getCollaborator: (collaborator: User) => void
    children: React.ReactNode
}

const CollaboratorSearch:React.FC<CollaboratorSearchProps> = ({children,existingCollaborators,getCollaborator}) => {
    const [searchResults,setSearchResults] = useState<User[] | [] >([])
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
  return (
    <div>CollaboratorSearch</div>
  )
}

export default CollaboratorSearch