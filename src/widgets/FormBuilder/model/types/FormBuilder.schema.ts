import type { Field } from "./Field.interface";

type FormBuilderState = {
  title: string | null;
  labels: {
    cancel?: string;
    save?: string;
    apply?: string;
  };
  fields: Field[] | null;
};

type FormBuilderActions = {
  setFields: (fields: Field[]) => void;
  setMeta: (meta: {
    title: FormBuilderState["title"];
    labels: FormBuilderState["labels"];
  }) => void;
};

export type FormBuilderSchema = FormBuilderState & FormBuilderActions;
