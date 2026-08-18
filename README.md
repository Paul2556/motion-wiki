# Motion Wiki

A learning resource for Model United Nations, built by delegates and designed for chairs.
Live at [wiki.motionmun.com](https://wiki.motionmun.com).

This isn't a manual for the [Motion](https://motionmun.com) app. It teaches MUN procedure itself,
so a page here reads the same way whether you're new to MUN entirely or just new to running
committee from the chair's seat. See the [delegate track](https://wiki.motionmun.com/delegates/overview)
to get started; the chair track is coming soon.

## Contributing

The fastest way in: every page has an **Edit this page** link at the bottom that opens GitHub's
editor already pointed at that file, no cloning or local setup needed. See
[wiki.motionmun.com/contributing](https://wiki.motionmun.com/contributing) for the full guide,
including what kinds of changes are most useful.

## Running locally

```
npm install
npx quartz build --serve --watch --concurrency 6   # http://localhost:8080
```

Requires Node >=22, npm >=10.9.2.

## Built with

This site runs on [Quartz](https://quartz.jzhao.xyz/), the static site generator originally built
by [Jacky Zhao](https://jzhao.xyz/). See [wiki.motionmun.com/credits](https://wiki.motionmun.com/credits)
for full attribution.
