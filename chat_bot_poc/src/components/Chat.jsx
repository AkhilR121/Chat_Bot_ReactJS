import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../services/getData";
import { useState } from "react";

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

function ChatComponent() {
  const [expanded, setExpanded] = useState({});
  const data = useQuery({
    queryKey: ["customer-data"],
    queryFn: getCustomers,
  });


  const handleToggle = (path) => {
    setExpanded((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const rootData = data.data;

  const renderRoot = () => {
    if (Array.isArray(rootData)) {
      return rootData.map((item, index) => (
        <div key={index} className="flex flex-col text-left w-xl">
          {isPlainObject(item) ? (
            Object.entries(item).map(([key, value]) => (
              <KeyValueCard
                key={key}
                keyLabel={key}
                value={value}
                expanded={expanded}
                onToggle={handleToggle}
                path={`${index}.${key}`}
              />
            ))
          ) : (
            <KeyValueCard
              key={index}
              keyLabel={index}
              value={item}
              expanded={expanded}
              onToggle={handleToggle}
              path={`${index}`}
            />
          )}
        </div>
      ));
    }

    if (isPlainObject(rootData)) {
      return (
        <div className="flex flex-col text-left w-xl">
          {Object.entries(rootData).map(([key, value]) => (
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
      );
    }

    if (rootData === undefined) {
      return null;
    }

    return (
      <div className="flex flex-col text-left w-xl">
        <KeyValueCard
          keyLabel="value"
          value={rootData}
          expanded={expanded}
          onToggle={handleToggle}
          path="root"
        />
      </div>
    );
  };

  return <>{renderRoot()}</>;
}

function KeyValueCard({ keyLabel, value, expanded, onToggle, path }) {
  const hasChildren = value && typeof value === "object";
  const isOpen = !!expanded[path];

  if (!hasChildren) {
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
        <ChevronIcon toggle={isOpen} onToggle={() => onToggle(path)} />
      </div>
      {isOpen && renderNestedValue(value, expanded, onToggle, path)}
    </div>
  );
}

function renderNestedValue(value, expanded, onToggle, parentPath) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <div className="ml-4">[]</div>;
    }

    return (
      <ul className="ml-4 list-disc">
        {value.map((item, index) => {
          const childPath = `${parentPath}[${index}]`;
          const isChildObject = item && typeof item === "object";
          const isOpen = !!expanded[childPath];

          return (
            <li key={childPath}>
              <span className="font-semibold">
                {index}{" "}
                {isChildObject && (
                  <ChevronIcon
                    toggle={isOpen}
                    onToggle={() => onToggle(childPath)}
                  />
                )}
              </span>
              {isChildObject && isOpen
                ? renderNestedValue(item, expanded, onToggle, childPath)
                : !isChildObject
                ? item == null
                  ? "---"
                  : String(item)
                : null}
            </li>
          );
        })}
      </ul>
    );
  }

  if (value && typeof value === "object") {
    return (
      <ul className="ml-4 list-disc">
        {Object.entries(value).map(([childKey, childValue]) => {
          const childPath = `${parentPath}.${childKey}`;
          const isChildObject = childValue && typeof childValue === "object";
          const isOpen = !!expanded[childPath];

          return (
            <li key={childPath}>
              <span className="font-semibold">
                {childKey}{" "}
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
