// @ts-ignore
import edjsHTML from "editorjs-html";
import { OutputData } from "@editorjs/editorjs";

export const edjsParser = edjsHTML();

export const parseToHtml = (editorData: OutputData) => {
  const parsed: Array<string> = edjsParser.parse(editorData);
  // const parsed: Array<string> = edjsParser.parseBlocks(editorData);
  return parsed;
};
