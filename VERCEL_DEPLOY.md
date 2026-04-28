
# Deploying to Vercel (step-by-step)

1. Push your repo to GitHub:
   - create a new GitHub repo
   - follow GitHub instructions to push local repo

2. Go to https://vercel.com and sign in (GitHub recommended).

3. Click "New Project" → Import from Git Repository → select your repo.

4. In the setup wizard:
   - Framework Preset: **Next.js**
   - Root Directory: `/` (unless changed)
   - Add Environment Variables:
     - `OPENAI_API_KEY` → (add your key, mark as secret)

5. Click "Deploy".

6. After deployment, go to **Settings → Domains** to add a custom domain or change subdomain.

Notes:
- To change Vercel subdomain for free, you can rename project or add a new domain in Vercel settings.
