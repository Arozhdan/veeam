import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormBuilderSchema } from "../types";

export const useFormBuilderStore = create<FormBuilderSchema>()(
  persist(
    (set) => ({
      title: null,
      labels: {
        cancel: "Cancel",
        save: "Save",
        apply: "Apply",
      },
      fields: null,
      setTitle: (title) => set({ title }),
      setLabels: (labels) => set({ labels }),
      setFields: (fields) => set({ fields }),
    }),
    {
      name: "form-builder",
      partialize: (state) => ({
        title: state.title,
        labels: state.labels,
        fields: state.fields,
      }),
    }
  )
);
