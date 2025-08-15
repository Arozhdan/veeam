import type { Field } from "../types";

export const mockFields: Field[] = [
  {
    label: "Name",
    type: "string",
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  {
    label: "Age",
    type: "numeric",
    required: true,
    min: 18,
    max: 100,
  },
  {
    label: "Description",
    type: "multi-line",
    required: true,
    minLength: 10,
    maxLength: 100,
    linesNum: 3,
  },
  {
    label: "Is active",
    type: "boolean",
    required: true,
    trueLabel: "Yes",
    falseLabel: "No",
  },
  {
    label: "Date",
    type: "date",
    required: true,
    format: "YYYY-MM-DD", // TODO: enable formats
  },
  {
    label: "Gender",
    type: "enum",
    required: true,
    options: ["Male", "Female", "Other"],
  },
];
