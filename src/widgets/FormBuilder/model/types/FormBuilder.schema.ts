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
  setTitle: (title: string) => void;
  setLabels: (labels: FormBuilderState["labels"]) => void;
  setFields: (fields: Field[]) => void;
};

export type FormBuilderSchema = FormBuilderState & FormBuilderActions;
