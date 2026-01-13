import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../services/getData";
import { useState } from "react";

function ChatComponent() {
  const [expanded, setExpanded] = useState({});
  const { data: customers = [] } = useQuery({
    queryKey: ["customer-data"],
    queryFn: getCustomers,
  });


  const handleToggle = (path) => {
    setExpanded((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <>
      {customers.map((customer, i) => (
        <div key={i} className="flex flex-col text-left w-xl">
          {Object.entries(customer).map(([key, value]) => (
            <KeyValueCard
              key={key}
              keyLabel={key}
              value={value}
              expanded={expanded}
              onToggle={handleToggle}
              path={key}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function KeyValueCard({ keyLabel, value, expanded, onToggle, path }) {
  const isObject = value && typeof value === "object" && !Array.isArray(value);

  if (!isObject) {
    return (
      <div className="border-2 border-blue-500 p-4 m-4 rounded-md">
        <p>
          {keyLabel}: {value == null ? "---" : String(value)}
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-500 p-4 m-4 rounded-md">
      <div className="flex gap-3">
        <h3 className="font-semibold mb-2">{keyLabel}</h3>
        {/* If there is nested object: chevron will render conditionally */}
        <ChevronIcon
          toggle={!!expanded[path]}
          onToggle={() => onToggle(path)}
        />
      </div>
      {!!expanded[path] && renderNestedValue(value, expanded, onToggle, path)}
    </div>
  );
}

function renderNestedValue(value, expanded, onToggle, parentPath) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return (
      <ul className="ml-4 list-disc">
        {Object.entries(value).map(([childKey, childValue]) => {
          const childPath = `${parentPath}.${childKey}`;
          const isChildObject =
            childValue &&
            typeof childValue === "object" &&
            !Array.isArray(childValue);
          const isOpen = !!expanded[childPath];

          return (
            <li key={childPath}>
              <span className="font-semibold">
                {childKey} {" "}
                {isChildObject && (
                  <ChevronIcon
                    toggle={isOpen}
                    onToggle={() => onToggle(childPath)}
                  />
                )}
              </span>
              {isChildObject && isOpen
                ? renderNestedValue(childValue, expanded, onToggle, childPath)
                : !isChildObject
                ? childValue == null
                  ? "---"
                  : String(childValue)
                : null}
            </li>
          );
        })}
      </ul>
    );
  }

  return value == null ? "---" : String(value);
}

function ChevronIcon({ toggle, onToggle }) {
  return (
    <span
      className={`fa ${
        toggle ? "fa-angle-up" : "fa-angle-down"
      } cursor-pointer text-4xl`}
      style={{ fontSize: "26px" }}
      onClick={onToggle}
    ></span>
  );
}

export default ChatComponent;
