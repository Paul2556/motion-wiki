import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })
}

const REPO = "https://github.com/Paul2556/motion-wiki"

// Reads the same fileData.dates shape created-modified-date attaches (confirmed by reading
// content-meta's own component source) - content-meta only ever shows one date type at a time,
// so this exists to show both created and modified together, at the bottom of the page.
export const DateFooter: QuartzComponentConstructor = () => {
  const Component: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const dates = fileData.dates
    const created = dates?.created
    const modified = dates?.modified
    // filePath is repo-root-relative (e.g. "content/delegates/motions.md"), matching what
    // created-modified-date's own git lookups use - confirmed via its source, not a guess.
    const editUrl = fileData.filePath ? `${REPO}/edit/main/${fileData.filePath}` : null

    return (
      <div className="motion-page-footer">
        {(created || modified) && (
          <p className="date-footer">
            {created && <span>First made {formatDate(created)}</span>}
            {created && modified && <span className="date-footer-sep"> · </span>}
            {modified && <span>Last updated {formatDate(modified)}</span>}
          </p>
        )}
        <p className="contribute-footer">
          If you would like to <a href="/contributing">contribute</a>
          {editUrl && (
            <>
              {" "}
              · <a href={editUrl} target="_blank" rel="noopener noreferrer">
                Edit this page
              </a>
            </>
          )}
        </p>
      </div>
    )
  }

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
  `

  return Component
}
