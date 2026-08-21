# Your saree catalog website

This is a real, working website: customers browse your sarees and message you
on WhatsApp to buy. You manage everything (photos, prices, sold items) from
a private `/admin` page — no coding needed after today.

Nothing is live yet. Follow the steps below in order — about 30-45 minutes,
one time only. After that, adding a saree takes under a minute.

---

## Step 1 — Create your Supabase account (free)

Supabase stores your saree data and photos.

1. Go to https://supabase.com → **Start your project** → sign up (free).
2. Click **New project**.
   - Name: anything, e.g. "saree-store"
   - Database password: generate one and **save it somewhere** (you likely
     won't need it again, but keep it just in case).
   - Region: pick the one closest to your customers (e.g. Mumbai/Singapore
     for India).
3. Wait ~2 minutes for the project to finish setting up.

## Step 2 — Create your database table

1. In your Supabase project, click **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Open the file `supabase/schema.sql` from this project, copy everything
   in it, and paste it into the SQL Editor.
4. Click **Run**. You should see "Success. No rows returned."

This created the table that holds your sarees, and a storage bucket for
photos.

## Step 3 — Get your Supabase keys

1. In Supabase, click the **gear icon (Project Settings)** → **API**.
2. You'll need two values from this page:
   - **Project URL** → this is your `SUPABASE_URL`
   - **service_role key** (under "Project API keys" — click "reveal") →
     this is your `SUPABASE_SERVICE_ROLE_KEY`
3. Keep this tab open — you'll paste these into Vercel in Step 6.

⚠️ The service_role key gives full access to your database. Never share it
publicly or put it in any code that runs in a browser. This project is
already built so it's only used privately on the server — you just need to
paste it into Vercel's settings, nowhere else.

## Step 4 — Put this code on GitHub

1. Go to https://github.com and create a free account if you don't have one.
2. Create a **new, empty repository** (e.g. named `saree-store`). Don't add
   a README or .gitignore when creating it — this project already has them.
3. On your own computer (or wherever you're reading this from), upload all
   the files from this project into that repository. If you're not sure
   how, tell me and I'll walk you through it step by step.

## Step 5 — Create your Vercel account and import the project (free)

Vercel hosts the website and gives you the live web address.

1. Go to https://vercel.com → sign up using your GitHub account.
2. Click **Add New → Project**.
3. Select the `saree-store` repository you created in Step 4 → **Import**.
4. Don't click Deploy yet — first open **Environment Variables** on this
   same screen and add all four below.

## Step 6 — Add your environment variables in Vercel

Add each of these as a Name/Value pair (see `.env.local.example` in this
project for the same list):

| Name | Value |
|---|---|
| `SUPABASE_URL` | from Step 3 |
| `SUPABASE_SERVICE_ROLE_KEY` | from Step 3 |
| `ADMIN_PASSWORD` | make up a password — this is what YOU type to log into `/admin` |
| `ADMIN_SESSION_SECRET` | make up any long random text (mash your keyboard) — you'll never type this in, it just needs to be long and private |

Now click **Deploy**. Wait 1-2 minutes. Vercel gives you a live web address
like `saree-store.vercel.app` — that's your real, working website.

*(Optional, later: you can connect a custom domain like
`www.yourbusinessname.com` under Vercel → Project → Settings → Domains.)*

## Step 7 — Add your real business details

Right now the site shows a placeholder name and WhatsApp number. Open
`lib/site-config.ts` in the code and update:

- `businessName` — your real shop name
- `whatsappNumber` — your real WhatsApp number, country code + digits only,
  no spaces or `+` (e.g. India: `919876543210`)
- `tagline`, `city`, `instagramHandle` — optional, edit or leave as is

Save, then push the change to GitHub (Step 4) — Vercel automatically
re-deploys the site with your changes within about a minute.

## Step 8 — Log in and add your first saree

1. Go to `your-site-address.vercel.app/admin`
2. Enter the `ADMIN_PASSWORD` you set in Step 6.
3. Click **+ Add new saree**, fill in the name, price, and upload photos,
   then **Add saree**. It appears on your live site immediately.

---

## How the everyday features work

- **Price drop badge** — enter a saree's "Original price" higher than its
  "Current price," and a "X% OFF" badge appears automatically on the site.
  No separate toggle to remember.
- **Mark as sold** — tick "Mark as sold" on a saree; it shows a "Sold"
  label and customers can't message you about it.
- **Feature on homepage** — tick this on your best saree; its photo becomes
  the homepage banner.
- **WhatsApp inquiry** — every saree page has an "Ask on WhatsApp" button
  that opens a chat pre-filled with that saree's name and price.

## If something breaks

- **Can't log into /admin** — double check `ADMIN_PASSWORD` in Vercel's
  environment variables matches exactly what you're typing (case-sensitive).
- **Photos won't upload** — check `SUPABASE_URL` and
  `SUPABASE_SERVICE_ROLE_KEY` in Vercel are exactly what Supabase showed you
  in Step 3, with no extra spaces.
- **Changed an environment variable in Vercel** — you must click
  **Redeploy** (Vercel → Deployments → ⋯ → Redeploy) for it to take effect.

If you get stuck on any step, come back and tell me exactly what you see —
I'll walk you through it.
