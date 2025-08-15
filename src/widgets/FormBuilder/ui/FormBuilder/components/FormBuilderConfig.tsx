import { useCallback, useState } from "react";
import { useFormBuilderStore } from "../../../model";
import type { Field, FormBuilderSchema } from "../../../model/types";
import { FieldsConfigValidation } from "../../../model/validation";

export const FormBuilderConfig = () => {
  const { title, labels, setMeta, setRaw, raw, setFields } =
    useFormBuilderStore();

  const [localTitle, setLocalTitle] =
    useState<FormBuilderSchema["title"]>(title);
  const [localLabels, setLocalLabels] =
    useState<FormBuilderSchema["labels"]>(labels);

  const handleSubmitMeta = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setMeta({ title: localTitle, labels: localLabels });
      alert("Meta saved");
    },
    [localTitle, localLabels, setMeta]
  );

  const handleSubmitFields = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const raw = formData.get("raw") as string;

      try {
        const parsedData = JSON.parse(raw);
        const validated = FieldsConfigValidation.validateSync(parsedData);
        if (!validated) return;
        setRaw(JSON.stringify(validated, null, 2));
        setFields(validated as Field[]);
        alert("Fields saved");
      } catch (error) {
        alert((error as Error).message);
      }
    },
    [setRaw, setFields]
  );

  return (
    <div>
      <form onSubmit={handleSubmitMeta} className="flex flex-col gap-2">
        <div>
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={localTitle ?? ""}
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => setLocalTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div>
            <label htmlFor="cancel" className="block mb-2">
              Cancel Label
            </label>
            <input
              type="text"
              id={"cancel" satisfies keyof FormBuilderSchema["labels"]}
              placeholder="Cancel"
              required
              value={localLabels.cancel ?? ""}
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) =>
                setLocalLabels({
                  ...localLabels,
                  [e.target.id]: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="save" className="block mb-2">
              Save Label
            </label>
            <input
              type="text"
              id={"save" satisfies keyof FormBuilderSchema["labels"]}
              placeholder="Save"
              required
              value={localLabels.save ?? ""}
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) =>
                setLocalLabels({
                  ...localLabels,
                  [e.target.id]: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="apply" className="block mb-2">
              Apply label
            </label>
            <input
              type="text"
              id={"apply" satisfies keyof FormBuilderSchema["labels"]}
              placeholder="Apply"
              required
              value={localLabels.apply ?? ""}
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) =>
                setLocalLabels({
                  ...localLabels,
                  [e.target.id]: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save meta
          </button>
        </div>
      </form>
      <div className="mt-4">
        <form onSubmit={handleSubmitFields}>
          <textarea
            className="border border-gray-300 rounded-md p-2 min-h-[200px] w-full"
            placeholder="Fields config"
            defaultValue={raw ?? ""}
            name="raw"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {labels.apply}
          </button>
        </form>
      </div>
    </div>
  );
};
