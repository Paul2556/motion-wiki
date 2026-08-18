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
    return /* @__PURE__ */ jsxs("div", { className: "motion-page-footer", children: [
      (created || modified) && /* @__PURE__ */ jsxs("p", { className: "date-footer", children: [
        created && /* @__PURE__ */ jsxs("span", { children: [
          "First made ",
          formatDate(created)
        ] }),
        created && modified && /* @__PURE__ */ jsx("span", { className: "date-footer-sep", children: " \xB7 " }),
        modified && /* @__PURE__ */ jsxs("span", { children: [
          "Last updated ",
          formatDate(modified)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "contribute-footer", children: [
        "If you would like to ",
        /* @__PURE__ */ jsx("a", { href: "/contributing", children: "contribute" })
      ] })
    ] });
  };
  Component.css = `
    .motion-page-footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--lightgray);
      font-size: 0.8rem;
      color: var(--darkgray);
    }
    .date-footer, .contribute-footer {
      font-size: 0.8rem;
      color: var(--darkgray);
    }
    .contribute-footer {
      margin-top: 0.4rem;
    }
    .contribute-footer a {
      color: var(--secondary);
    }
  `;
  return Component;
};
export {
  DateFooter
};
