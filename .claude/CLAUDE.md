# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## What this is

A [Quartz v5](https://quartz.jzhao.xyz/) static site: a MUN (Model United Nations) learning
resource, not an app manual. It's the companion wiki for the [Motion](../Motion) app (a separate,
unrelated React/Vite/Tailwind repo, sibling directory), but this site teaches MUN procedure
itself, aimed at both delegates and chairs. See `content/index.md` for the actual pitch/voice.

Two tracks: `content/delegates/` (done, 11 pages walking pre-conference prep through voting) and
a future `content/chairs/` (not started, homepage says "Coming soon").

**This is a completely different toolchain from Motion.** Quartz is not Vite, not React (it uses
Preact under the hood), and has its own CLI/build system. Don't assume anything about Motion's
`npm run dev`/`build`/`lint` scripts carries over here, it doesn't.

## Commands

```
npx quartz build --serve --watch --concurrency 6   # dev server, http://localhost:8080
npx quartz build                                     # one-shot production build
npx quartz plugin add ./local-plugins/<name>          # register a local plugin
npx quartz plugin install --from-config               # sync plugins to quartz.config.yaml
npx quartz plugin install --latest <name>              # rebuild one plugin (npm install + build)
```

Requires Node >=22, npm >=10.9.2 (matches Motion's Node version, coincidentally).

There's no lint/test script configured. The closest thing to CI feedback is `npx quartz build`
actually succeeding with no warnings in the output.

## Architecture

### Config is the source of truth for almost everything

`quartz.config.yaml` drives site title, colors (light/dark palettes under
`theme.colors.lightMode`/`darkMode`), typography, and the full plugin/layout list. Most changes
that feel like "editing code" are actually just YAML edits here. `quartz.ts` is a near-empty
override entrypoint (`loadQuartzConfig`/`loadQuartzLayout()`) - only touch it for things YAML
genuinely can't express.

Colors/typography here were deliberately matched to Motion's brand (black/white primary palette,
one brown accent family, Inter typeface) - see `../Motion/.claude/brandIdentity.md` for the
source of truth. Quartz has no equivalent of Motion's `filter: invert(1)` theming trick, so the
light/dark values here are independently tuned to land on the same accent hue, not literal copies
of Motion's CSS custom properties.

### Local plugins (`local-plugins/`)

Plugins specific to this site (not meant for reuse elsewhere) live in `local-plugins/<name>/` and
get registered via `npx quartz plugin add ./local-plugins/<name>` - this symlinks them into
`.quartz/plugins/` (gitignored; the real source of truth is `local-plugins/`, which **is**
committed, including its built `dist/`).

**After editing a local plugin's `src/`, you must rebuild it manually** (`cd local-plugins/<name>
&& npx tsup`, or `npx quartz plugin install --latest <name>` from the repo root) - the site's
`--serve --watch` only watches content/config, not plugin TypeScript sources. A stale `dist/`
after an edit is the most likely reason a plugin "isn't picking up your change."

**Component-only local plugins need a `./components` subpath export**, not just the main `.`
export. Quartz's loader imports components from `<pluginName>/components` specifically (see
`quartz/plugins/loader/componentLoader.ts`), so a `package.json` with only a `"."` export entry
will fail silently with `Plugin "X" declares components but failed to load them` and no further
detail. The component itself must also be a **named export matching the manifest's
`components.<Name>` key exactly** (e.g. `export const DateFooter = ...`), not a default export -
see `local-plugins/date-footer/` for a working reference.

### The `/index` naming trap

Any content file whose slug ends in `/index` (i.e. any file literally named `index.md` inside a
subfolder) gets forced into Quartz's built-in "folder page" type, which unconditionally appends an
"N items under this folder" listing below the real content - there's no config option to fully
suppress it (`showFolderCount: false` only hides the count sentence, not the list). `content-page`
(the normal single-article page type) explicitly refuses to handle `/index`-slugged files, so
there's no way to opt out short of not naming the file `index.md`.

**If a subfolder needs a real curated landing page, name it something else** (`overview.md`, as
`content/delegates/overview.md` does) and link to it directly. Only the site root
(`content/index.md`) is exempt from this, since its slug is just `index`, not `.../index`.

### Wikilinks need an explicit alias

Internal links use Obsidian-style `[[slug|Display Text]]`. **Always include the `|Display Text`
part.** A bare `[[some-hyphenated-slug]]` renders the raw slug text verbatim, hyphens and all, not
the target page's title - confirmed by testing, not a guess. This is easy to miss in a markdown
table cell especially (a "Read more" column full of bare `[[slug]]` links looks fine in the
source and terrible rendered).

### Dates

The `created-modified-date` plugin computes `fileData.dates.created`/`.modified` by checking
frontmatter, then git history, then filesystem mtime, in that order. A build warning like
`content/foo.md isn't yet tracked by git, dates will be inaccurate` for a brand-new file is
expected and harmless - it resolves itself once the file is committed.

## Content conventions

- **No em dashes**, anywhere - chat responses or file content. Use a comma, period, or colon
  instead depending on what the sentence needs. This is a hard style rule for this user, not a
  one-off.
- MUN procedure genuinely varies conference to conference (vote thresholds, quorum percentages,
  whether a given point can interrupt a speaker, "table" meaning opposite things in
  American vs. British usage). Don't flatten that into one universal answer - state the most
  common/widely-taught version, then flag known variation explicitly. See any page in
  `content/delegates/` for the established pattern.
- Ground procedural content in real sources, don't write it from memory. See "Agent memory" below.

## Agent memory

`.claude/agents/mun-researcher.md` is a read-only research subagent (`Read`, `WebSearch`,
`WebFetch`, no `Write`/`Edit`) for exactly this: given a list of MUN procedure topics, it reads
real online guides (Best Delegate, NHSMUN/THIMUN-style Rules of Procedure docs, the UN's own MUN
pages) and returns a sourced research brief, explicitly flagging conference-to-conference
variation rather than inventing a single universal answer. Use it (or brief a `general-purpose`
agent with the same role/instructions inline if the custom type isn't resolving for some reason,
that's a known cross-session quirk, not a sign the file is wrong) before writing any new
procedure-heavy content page. Don't write MUN procedural facts from training-data memory alone.
