// src/index.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
function formatDate(d) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}
var DateFooter = () => {
  const Component = ({ fileData }) => {
    const dates = fileData.dates;
    const created = dates?.created;
    const modified = dates?.modified;
    if (!created && !modified) return null;
    return /* @__PURE__ */ jsxs("p", { className: "date-footer", children: [
      created && /* @__PURE__ */ jsxs("span", { children: [
        "First made ",
        formatDate(created)
      ] }),
      created && modified && /* @__PURE__ */ jsx("span", { className: "date-footer-sep", children: " \xB7 " }),
      modified && /* @__PURE__ */ jsxs("span", { children: [
        "Last updated ",
        formatDate(modified)
      ] })
    ] });
  };
  Component.css = `
    .date-footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--lightgray);
      font-size: 0.8rem;
      color: var(--darkgray);
    }
  `;
  return Component;
};
export {
  DateFooter
};
