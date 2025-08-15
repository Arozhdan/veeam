export type FieldType =
  | "numeric"
  | "string"
  | "multi-line"
  | "boolean"
  | "date"
  | "enum";

export type NumericField = {
  min?: number;
  max?: number;
};

export type StringField = {
  minLength?: number;
  maxLength?: number;
};

export type MultiLineField = {
  minLength?: number;
  maxLength?: number;
  linesNum?: number;
};

export type BooleanField = {
  trueLabel?: string;
  falseLabel?: string;
};

export type DateField = {
  format?: string;
};

export type EnumField = {
  options: string[];
};

export type Field = {
  type: FieldType;
  label: string;
  required: boolean;
} & (
  | ({ type: "numeric" } & NumericField)
  | ({ type: "string" } & StringField)
  | ({ type: "multi-line" } & MultiLineField)
  | ({ type: "boolean" } & BooleanField)
  | ({ type: "date" } & DateField)
  | ({ type: "enum" } & EnumField)
);
