import React, { useEffect, useState } from "react";

import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EditorTools } from "../../utils/tools";
import { Box, Typography, useTheme } from "@mui/material";
import { darkStyles } from ".";

type Tools = {
  [toolName: string]: EditorJS.ToolConstructable | EditorJS.ToolSettings;
};
type useEditor = (
  toolsList: Tools,
  param1: any,
  options?: EditorJS.EditorConfig
) => { editor: EditorJS | null };

export const useEditor: useEditor = (
  toolsList,
  { data, editorRef },
  options = {}
) => {
  const [editorInstance, setEditor] = useState<EditorJS | null>(null);
  const {
    data: ignoreData,
    tools: ignoreTools,
    holder: ignoreHolder,
    ...editorOptions
  } = options;

  // initialize
  useEffect(() => {
    const editor = new EditorJS({
      holder: "editor-js",
      tools: toolsList,
      data: data || {},
      minHeight: 50,
      ...editorOptions
    });

    setEditor(editor);

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
          setEditor(null);
        })
        .catch((e) => console.error("ERROR editor cleanup", e));
    };
  }, [data, toolsList, editorOptions]);

  return { editor: editorInstance };
};

export interface EditorFieldProps {
  onDataChange: (data: OutputData) => void;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  error?: boolean;
  helperText?: string | boolean;
}

export const EditorField: React.FC<EditorFieldProps> = ({
  onDataChange,
  onBlur,
  error,
  helperText
}) => {
  useEditor(
    EditorTools,
    { data: "" },
    {
      onChange: async (api, _event) => {
        const data = await api.saver.save();
        onDataChange(data);
      }
    }
  );

  const theme = useTheme();
  let editorStyles = {};
  if (theme.palette.mode === "dark") editorStyles = darkStyles(theme);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        onBlur={onBlur}
        sx={[
          editorStyles,
          { borderColor: "divider" },
          !!error && { borderColor: "error.main" }
        ]}
        id="editor-js"
      ></Box>
      <style jsx global>{`
        .cdx-notify--error {
          background: ${theme.palette.background.paper} !important;
          border-color: ${theme.palette.divider};
        }
      `}</style>
      <Typography sx={{ mx: 1.75, mt: 0.375 }} variant="caption" color="error">
        {helperText}
      </Typography>
    </Box>
  );
};
