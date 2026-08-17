import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })
}

// Reads the same fileData.dates shape created-modified-date attaches (confirmed by reading
// content-meta's own component source) - content-meta only ever shows one date type at a time,
// so this exists to show both created and modified together, at the bottom of the page.
export const DateFooter: QuartzComponentConstructor = () => {
  const Component: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const dates = fileData.dates
    const created = dates?.created
    const modified = dates?.modified
    if (!created && !modified) return null

    return (
      <p className="date-footer">
        {created && <span>First made {formatDate(created)}</span>}
        {created && modified && <span className="date-footer-sep"> · </span>}
        {modified && <span>Last updated {formatDate(modified)}</span>}
      </p>
    )
  }

  Component.css = `
    .date-footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--lightgray);
      font-size: 0.8rem;
      color: var(--darkgray);
    }
  `

  return Component
}
