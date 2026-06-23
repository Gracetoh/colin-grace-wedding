# 💍 Colin & Grace — Wedding Planner

A private website that replaces your `Wedding 2026 Planning.xlsx`. You and your
fiancé edit everything together and changes sync **live**; your bridal party gets
a phone-friendly login that only shows the day-of tools (red packets, check-in,
points of contact, run sheet, vendors) — **never the budget or planning.**

It comes **pre-loaded with your real data**: 210 guests, 44 budget line items,
90 to-dos, and all your tables.

---

## What's inside

| Page | Who can see it | What it does |
|------|----------------|--------------|
| **Dashboard** | Couple | Days to go, RSVP/budget/to-do summary |
| **Guest List** | Couple | 210 guests, RSVP, groups, dietary, search, CSV export |
| **Seating Plan** | Couple | **Drag & drop** RSVP'd guests onto tables |
| **Budget** | Couple **only** | Categories, planned/actual/paid, outstanding |
| **To-Do List** | Couple | 90 tasks across 6 phases, status tracking |
| **Day-Of Tracking** | Everyone | Check guests in + log red packets (live $ total) |
| **Points of Contact** | Everyone | Who's responsible for each task on the day |
| **Run Sheet** | Everyone | Minute-by-minute timeline |
| **Vendors** | Everyone | Tap-to-call vendor contacts |
| **Team & Access** | Couple | Promote people to Couple / keep as bridal party |

Roles are enforced **inside the database** (Supabase Row-Level Security), so the
budget is genuinely invisible to the bridal party — not just hidden on screen.

---

## ⏱️ One-time setup (about 15 minutes, no coding)

You'll do three things: (1) create a free database, (2) load your data,
(3) put it online. Then everyone just opens a link and logs in.

### STEP 1 — Create the free database (Supabase)

1. Go to **https://supabase.com** → **Start your project** → sign in with Google/GitHub.
2. Click **New project**. Give it a name (e.g. `wedding`), set a database password
   (save it somewhere), pick the region closest to you (Singapore), click **Create**.
3. Wait ~2 minutes for it to finish setting up.

### STEP 2 — Create the tables + load your data

1. In your Supabase project, open the **SQL Editor** (left sidebar, the `</>` icon).
2. Click **+ New query**. Open the file [`supabase/schema.sql`](supabase/schema.sql)
   from this folder, copy **all** of it, paste into the editor, click **Run**.
   You should see *Success*.
3. Click **+ New query** again. Open [`supabase/seed.sql`](supabase/seed.sql),
   copy all of it, paste, click **Run**. This loads your 210 guests, budget, etc.
   *(Only run the seed once — running twice would duplicate rows.)*

### STEP 3 — Get your two keys

1. In Supabase go to **Project Settings** (gear icon) → **API**.
2. Copy the **Project URL** and the **anon / public** key.
3. In this folder, make a copy of `.env.example` named `.env` and paste them in:

   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

### STEP 4 — Try it on your computer first

In a Terminal, inside this `wedding-app` folder:

```bash
npm install      # first time only
npm run dev
```

Open the link it prints (usually http://localhost:5173). **The very first
account you create becomes the Couple (full access).** Create yours, then have
your fiancé create theirs and promote them on the **Team & Access** page.

---

## 🌐 STEP 5 — Put it online (so phones can use it on the day)

This makes a real link like `colin-grace.vercel.app`. Free.

**Easiest path — Vercel:**

1. Create a free account at **https://vercel.com** (sign in with GitHub).
2. Push this `wedding-app` folder to a **private** GitHub repo
   (or use Vercel's drag-and-drop: `npm run build`, then drag the `dist` folder
   to https://vercel.com/new — but GitHub is better for future edits).
3. In Vercel → **Add New → Project** → pick the repo.
4. Under **Environment Variables**, add the same two values from your `.env`:
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Click **Deploy**. In ~1 minute you get your link. Share it with the bridal party.

> **Tip:** add a file named `vercel.json` is *not* required — this project already
> works as a standard Vite app. If deep links (e.g. refreshing on `/budget`) ever
> 404, add a rewrite: see "SPA routing" note at the bottom.

**Netlify** works the same way: drag the `dist` folder to https://app.netlify.com/drop,
or connect the repo and set the two environment variables. Build command `npm run build`,
publish directory `dist`.

---

## 👰 Inviting your bridal party

1. Send them the link.
2. They tap **Create Account** and sign up.
3. They automatically get **bridal party** access — they'll only ever see the
   day-of tools. No further setup needed.

If you want someone to have full access (e.g. your wedding planner), open
**Team & Access** and switch them to **Couple**.

---

## 🔒 A note on the budget being private

The bridal party literally cannot load the budget or to-do data — the database
rejects the request for anyone who isn't a Couple. So even a tech-savvy guest
poking around can't see it. That's the `is_owner()` rule in `schema.sql`.

---

## Editing / re-running

- Changed your mind about the seed data? You can edit any cell live in the app —
  no need to touch SQL again.
- To **wipe and re-seed**: in SQL Editor run `truncate guests, budget_items, todos,
  vendors, pocs, rundown, tables cascade;` then run `seed.sql` again.

## Troubleshooting

- **"Almost there!" screen** → your `.env` is missing or still has the placeholder
  URL. Add real values and restart `npm run dev`.
- **Can't sign in / "Email not confirmed"** → in Supabase → **Authentication →
  Providers → Email**, turn **Confirm email** off for a smoother experience
  (fine for a private wedding tool), or just click the confirmation email.
- **SPA routing 404 on refresh (Vercel)** → add `vercel.json` with:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
  ```

---

Made with 💕 for Colin & Grace · 12 September 2026 · Shangri-La
