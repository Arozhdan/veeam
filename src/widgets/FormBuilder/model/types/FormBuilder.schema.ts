import type { Field } from "./Field.interface";

type FormBuilderState = {
  title: string | null;
  labels: {
    cancel?: string;
    save?: string;
    apply?: string;
  };
  raw: string | null;
  fields: Field[] | null;
};

type FormBuilderActions = {
  setRaw: (raw: string) => void;
  setFields: (fields: Field[]) => void;
  setMeta: (meta: {
    title: FormBuilderState["title"];
    labels: FormBuilderState["labels"];
  }) => void;
};

export type FormBuilderSchema = FormBuilderState & FormBuilderActions;
