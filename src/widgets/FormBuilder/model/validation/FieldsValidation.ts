import { array, boolean, object, string, number } from "yup";
import type { FieldType } from "../types";

export const FieldsConfigValidation = array().of(
  object({
    label: string().required(),
    type: string()
      .required()
      .oneOf([
        "string",
        "numeric",
        "date",
        "boolean",
        "enum",
        "multi-line",
      ] satisfies FieldType[]),
    required: boolean().required(),
    min: number()
      .optional()
      .test(
        "numeric-only",
        "min is only valid for numeric fields",
        function (value) {
          const { type } = this.parent;
          return type === "numeric" || value === undefined;
        }
      ),
    max: number()
      .optional()
      .test(
        "numeric-only",
        "max is only valid for numeric fields",
        function (value) {
          const { type } = this.parent;
          return type === "numeric" || value === undefined;
        }
      ),
    minLength: number()
      .optional()
      .test(
        "string-only",
        "minLength is only valid for string fields",
        function (value) {
          const { type } = this.parent;
          return (
            type === "string" || type === "multi-line" || value === undefined
          );
        }
      ),
    maxLength: number()
      .optional()
      .test(
        "string-only",
        "maxLength is only valid for string fields",
        function (value) {
          const { type } = this.parent;
          return (
            type === "string" || type === "multi-line" || value === undefined
          );
        }
      ),
    linesNum: number()
      .optional()
      .test(
        "multi-line-only",
        "linesNum is only valid for multi-line fields",
        function (value) {
          const { type } = this.parent;
          return type === "multi-line" || value === undefined;
        }
      ),
    trueLabel: string()
      .optional()
      .test(
        "boolean-only",
        "trueLabel is only valid for boolean fields",
        function (value) {
          const { type } = this.parent;
          return type === "boolean" || value === undefined;
        }
      ),
    falseLabel: string()
      .optional()
      .test(
        "boolean-only",
        "falseLabel is only valid for boolean fields",
        function (value) {
          const { type } = this.parent;
          return type === "boolean" || value === undefined;
        }
      ),
    format: string()
      .optional()
      .test(
        "date-only",
        "format is only valid for date fields",
        function (value) {
          const { type } = this.parent;
          return type === "date" || value === undefined;
        }
      ),
    options: array()
      .of(string())
      .optional()
      .test(
        "enum-required",
        "options is required for enum fields",
        function (value) {
          const { type } = this.parent;
          return type !== "enum" || (value && value.length > 0);
        }
      ),
  })
);
