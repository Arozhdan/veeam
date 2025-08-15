import { useMemo, useState } from "react";
import { FormBuilderConfig } from "./components/FormBuilderConfig";
import { FormBuilderDisplay } from "./components/FormBuilderDisplay";
import { useFormBuilderStore } from "../../model";

export const FormBuilder = () => {
  const [view, setView] = useState<"config" | "display">("config");
  const { title, fields } = useFormBuilderStore();

  const isDisplayDisabled = useMemo(() => {
    return !title || !fields;
  }, [title, fields]);

  return (
    <div className="p-4 ">
      <div className="flex gap-2 mb-4">
        <button
          className="px-2 py-1 bg-amber-200 cursor-pointer"
          onClick={() => setView("config")}
        >
          Config
        </button>
        <button
          className={`px-2 py-1 ${
            isDisplayDisabled
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-amber-200 cursor-pointer"
          }`}
          disabled={isDisplayDisabled}
          onClick={() => setView("display")}
        >
          Display
        </button>
      </div>
      {view === "config" ? <FormBuilderConfig /> : <FormBuilderDisplay />}
    </div>
  );
};
