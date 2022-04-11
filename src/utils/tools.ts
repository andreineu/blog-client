//@ts-nocheck
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";

import { uploadFile } from "./uploadFile";

export const EditorTools = {
  header: {
    class: Header,
    inlineToolbar: ["link"]
  },
  list: {
    class: List,
    inlineToolbar: true
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true
  },
  embed: Embed,
  code: Code,
  linkTool: LinkTool,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file: File) {
          const promise = uploadFile({ file });
          return promise;
        }
      }
    }
  }
};
