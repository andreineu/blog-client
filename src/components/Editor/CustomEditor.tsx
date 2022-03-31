import React, { useEffect } from "react";

import EditorJS, { OutputData } from "@editorjs/editorjs";

import { EditorTools } from "../../utils/tools";
import { Box, useTheme, Typography } from "@mui/material";

export interface CustomEditorProps {
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  onDataChange: (data: OutputData) => void;
  error?: boolean;
  helperText?: string | boolean;
}

export const CustomEditor: React.FC<CustomEditorProps> = ({
  onDataChange,
  onBlur,
  error,
  helperText
}) => {
  const theme = useTheme();
  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Start writing!",
      minHeight: 50,
      tools: EditorTools,
      onChange: async (api, _event) => {
        const data = await api.saver.save();
        onDataChange(data);
      }
    });
    return editor.destroy;
  }, []);
  let editorStyles = {};
  if (theme.palette.mode === "dark")
    editorStyles = {
      width: "100%",
      border: 1,
      borderColor: "divider",
      px: 3,
      py: 2,
      borderRadius: 1,

      ".codex-editor svg": {
        fill: "white"
      },
      ".ce-settings, .ce-toolbox, .ce-inline-toolbar, ce-inline-tool": {
        bgcolor: "background.default",
        border: 1,
        borderColor: "divider"
      },
      ".ce-settings__button:hover, .ce-toolbox__button:hover, .ce-toolbar__plus:hover, .ce-toolbox__button--active":
        {
          bgcolor: "grey.800"
        },
      ".ce-toolbar__settings-btn--active, .ce-toolbar__settings-btn:hover, .ce-inline-tool:hover":
        {
          bgcolor: "grey.800"
        },
      ".ce-inline-tool--active>svg": {
        fill: theme.palette.primary.main
      },
      ".ce-block--selected .ce-block__content": {
        bgcolor: "grey.600"
      }
    };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        onBlur={onBlur}
        sx={{
          ...editorStyles,
          ...(error ? { borderColor: "error.main" } : {})
        }}
        id="editorjs"
      ></Box>

      <Typography sx={{ mx: 1.75, mt: 0.375 }} variant="caption" color="error">
        {helperText}
      </Typography>
    </Box>
  );
};
