import { Theme } from "@mui/material";

export * from "./TextEditor";

export const darkStyles = (theme: Theme) => ({
  width: "100%",
  border: 1,
  borderColor: "divider",
  px: 3,
  py: 2,
  borderRadius: 1,

  ".codex-editor svg": {
    fill: "white"
  },
  ".ce-settings, .ce-toolbox, .ce-inline-toolbar, ce-inline-tool,.ce-conversion-toolbar, .ce-conversion-tool__icon":
    {
      bgcolor: "background.default",
      border: 1,
      borderColor: "divider"
    },
  ".ce-settings__button:hover, .ce-toolbox__button:hover, .ce-toolbar__plus:hover, .ce-toolbox__button--active, .ce-conversion-tool:hover":
    {
      bgcolor: "grey.800"
    },
  ".ce-toolbar__settings-btn--active, .ce-toolbar__settings-btn:hover, .ce-inline-tool:hover, .ce-inline-toolbar__dropdown:hover":
    {
      bgcolor: "grey.800"
    },
  ".ce-inline-tool--active>svg": {
    fill: theme.palette.primary.main
  },
  ".ce-block--selected .ce-block__content": {
    bgcolor: "grey.600"
  },
  ".ce-code__textarea": {
    bgcolor: "background.default",
    border: 1,
    borderColor: "divider",
    color: (th: Theme) => th.palette.primary.main
  },
  ".cdx-button,.image-tool--loading .image-tool__image": {
    bgcolor: "background.default",
    border: 1,
    borderColor: "divider"
  },
  ".cdx-notify--error": {
    color: (th: Theme) => th.palette.primary.main,
    bgcolor: (th: Theme) => th.palette.background.default + " !important"
  }
});
