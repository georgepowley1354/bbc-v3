# Netlify Sites — Workspace Safety Guide

## Site Registry

| Project | Type | Publish Dir | Deploy Command | Notes |
|---------|------|-------------|----------------|-------|
| `haven/` | Next.js static export | `out/` | `netlify deploy --prod --dir out` | `output: 'export'` in next.config.mjs |
| `verdant/` | Next.js static export | `out/` | `netlify deploy --prod --dir out` | `output: 'export'` in next.config.mjs |
| `bbc-v3/` | Static HTML | `.` | `netlify deploy --prod --dir .` | No build step |
| `doberts-canvas/` | Static HTML | `.` | `netlify deploy --prod --dir .` | No build step |
| `kris-mid-city/` | Static HTML | `.` | `netlify deploy --prod --dir .` | No build step |
| `whatsshakinbacon/` | Static HTML | `.` | `netlify deploy --prod --dir .` | No build step |

---

## The Windows Deploy Rule — Read This First

**Never run `netlify deploy` with a build step from Windows for Next.js projects.**

When `@netlify/plugin-nextjs` runs on Windows, it generates `.netlify/functions/manifest.json`
with hardcoded `C:\Users\georg\...` paths. Netlify's Linux servers can't resolve these paths.
The function deploys as "ready" but returns 404 on every route.

### Safe deploy pattern for Next.js (haven, verdant):

```bash
# 1. Build first (this is fine on Windows)
npm run build

# 2. Deploy the pre-built static output directly — no plugin, no build step
netlify deploy --prod --dir out
```

**Never do this from Windows:**
```bash
netlify deploy --prod          # runs build via plugin → Windows paths baked in → 404s
netlify deploy --prod --build  # same problem
```

---

## Never Use `@netlify/plugin-nextjs` on Windows

Both `haven/` and `verdant/` use `output: 'export'` (fully static). They do not need the plugin.
The plugin is for SSR (server-side rendered) Next.js apps. Static exports have no serverless functions.

If a project uses `output: 'export'`:
- **Remove** `@netlify/plugin-nextjs` from `package.json`
- **Remove** `[[plugins]]` from `netlify.toml`
- **Use** `publish = "out"` in `netlify.toml`

If a future project needs true SSR (no `output: 'export'`):
- Deploy via **Netlify CI/CD** (push to git, let Netlify build on Linux)
- Never deploy SSR Next.js manually from Windows

---

## Root-Level Danger Zone

`C:/Users/georg/my-project/netlify.toml` exists for BBC assistant functions (`netlify/functions/`).
It points to `publish = "bbc-v3"`.

**NEVER run `netlify deploy` from `C:/Users/georg/my-project/`** — it will deploy bbc-v3 content
to whichever site is in `.netlify/state.json` at the root, which may be the wrong site.

Always `cd` into the specific project folder before deploying.

---

## Correct Deploy Sequence (all projects)

```bash
# Static HTML sites (bbc-v3, doberts-canvas, kris-mid-city, whatsshakinbacon)
cd my-project/<project>/
netlify deploy --prod --dir .

# Next.js static export (haven, verdant)
cd my-project/<project>/
npm run build
netlify deploy --prod --dir out

# Verify after every deploy
curl -s -o /dev/null -w "%{http_code}" https://<site>.netlify.app/
# Must return 200
```

---

## What Breaks Things (checklist before any deploy)

- [ ] `@netlify/plugin-nextjs` in `package.json` or `netlify.toml` for a static export project → remove it
- [ ] `publish = ".next"` with the plugin → breaks routing via Windows path issue
- [ ] Running `netlify deploy` from the repo root → wrong site gets overwritten
- [ ] `.netlify/state.json` at a wrong directory level → audit with `cat .netlify/state.json` before deploying
- [ ] Re-running `netlify deploy --prod` without `--dir` for Next.js → triggers plugin build on Windows

---

## Known Config Files

Each project has its own `netlify.toml`. That file is the source of truth.
The `.netlify/` directories are gitignored — they're local CLI state, not source of truth.
