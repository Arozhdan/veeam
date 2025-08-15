import { useCallback, useMemo, useState } from "react";
import { FormBuilderConfig } from "./components/FormBuilderConfig";
import { FormBuilderDisplay } from "./components/FormBuilderDisplay";
import { useFormBuilderStore } from "../../model";
import { mockFields } from "../../model/const";

export const FormBuilder = () => {
  const [view, setView] = useState<"config" | "display">("config");
  const [showJson, setShowJson] = useState(false);
  const { title, fields } = useFormBuilderStore();

  const isDisplayDisabled = useMemo(() => {
    return !title || !fields;
  }, [title, fields]);

  const handleCopyMock = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(mockFields, null, 2));
  }, []);

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
        <button
          className="px-2 py-1 bg-amber-200 cursor-pointer"
          onClick={handleCopyMock}
        >
          Copy mock
        </button>
      </div>
      {view === "config" ? <FormBuilderConfig /> : <FormBuilderDisplay />}
      <button
        className="px-2 py-1 bg-amber-200 cursor-pointer"
        onClick={() => setShowJson(!showJson)}
      >
        {showJson ? "Hide JSON" : "Show JSON"}
      </button>
      {showJson && <pre>{JSON.stringify({ title, fields }, null, 2)}</pre>}
    </div>
  );
};
