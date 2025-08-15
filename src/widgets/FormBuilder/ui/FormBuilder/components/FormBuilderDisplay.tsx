import { useFormBuilderStore } from "@/widgets/FormBuilder/model";
import { useCallback } from "react";
import type { Field } from "../../../model/types";

export const FormBuilderDisplay = () => {
  const { fields } = useFormBuilderStore();

  const renderField = useCallback((field: Field) => {
    switch (field.type) {
      case "string":
        return (
          <input
            type="text"
            className="border border-gray-300 rounded-md p-0.5"
          />
        );
      case "multi-line":
        return <textarea className="border border-gray-300 rounded-md p-0.5" />;
      case "boolean":
        return (
          <input
            type="checkbox"
            className="border border-gray-300 rounded-md p-0.5"
          />
        );
      case "date":
        return (
          <input
            type="date"
            className="border border-gray-300 rounded-md p-0.5"
          />
        );
      case "enum":
        return (
          <select className="border border-gray-300 rounded-md p-0.5">
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
    }
  }, []);

  if (!fields) return null;

  return (
    <div>
      {fields.map((field) => (
        <div key={field.label}>
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </span>
            {renderField(field)}
          </label>
        </div>
      ))}
    </div>
  );
};
