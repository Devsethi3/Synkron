"use client";

import { Folder, workspace } from "@/lib/supabase/supabase.types";
import { useAppState } from "@/providers/StateProvider";
import { useCallback, useState } from "react";
import type Quill from "quill";

interface QuillEditorProps {
  dirDetails: File | Folder | workspace;
  fileId: string;
  dirType: "workspace" | "folder" | "file";
}

var TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const QuillEditor: React.FC<QuillEditorProps> = ({
  dirDetails,
  fileId,
  dirType,
}) => {
  const { state, workspaceId, folderId, dispatch } = useAppState();
  const [quill, setQuill] = useState();
  
//   const wrapperRef = useCallback(async (wrapper: any) => {
//     if (typeof window !== 'undefined') {
//       if (wrapper === null) return;
//       wrapper.innerHTML = '';
//       const editor = document.createElement('div');
//       wrapper.append(editor);
//       const Quill = (await import('quill')).default;
//       const QuillCursors = (await import('quill-cursors')).default;
//       Quill.register('modules/cursors', QuillCursors);
//       const q = new Quill(editor, {
//         theme: 'snow',
//         modules: {
//           toolbar: TOOLBAR_OPTIONS,
//           cursors: {
//             transformOnTextChange: true,
//           },
//         },
//       });
//       setQuill(q);
//     }
//   }, []);
  return (
    <div id="container" ref={wrapperRef} className="max-w-[800px]">
      QuillEditor
    </div>
  );
};

export default QuillEditor;
