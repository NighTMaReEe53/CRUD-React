export type INPUT_NAME = "TITLE" | "DESCRIPTION" | "IMG_URL" | "PRICE";

export interface INPUT_PROPS {
  ID: string;
  LABEL: string;
  NAME: INPUT_NAME;
  TYPE: string;
}
