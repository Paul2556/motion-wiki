// src/index.tsx
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
function formatDate(d) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}
var REPO = "https://github.com/Paul2556/motion-wiki";
var DateFooter = () => {
  const Component = ({ fileData }) => {
    const dates = fileData.dates;
    const created = dates?.created;
    const modified = dates?.modified;
    const editUrl = fileData.filePath ? `${REPO}/edit/main/${fileData.filePath}` : null;
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
        /* @__PURE__ */ jsx("a", { href: "/contributing", children: "contribute" }),
        editUrl && /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          "\xB7 ",
          /* @__PURE__ */ jsx("a", { href: editUrl, target: "_blank", rel: "noopener noreferrer", children: "Edit this page" })
        ] })
      ] })
    ] });
  };
  Component.css = `
    .motion-page-footer {
      margin-top: 1rem;
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
