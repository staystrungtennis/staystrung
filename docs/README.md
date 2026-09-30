# Stay Strung Tennis Co. — website

A plain static site (HTML + CSS + a little JavaScript). No build step, no monthly fee.

```
index.html           Home (with the "Book a stringing" form)
sessions.html        On-court sessions
membership.html      Membership tiers
get-strung/          Landing page the flier & postcard QR codes point to
css/style.css        All styling (colors live at the top in :root)
js/main.js           Menu + booking form
assets/              Logo, tennis ball, racquet graphics, fonts
```

---

## Put it online for free with GitHub Pages

1. **Make a GitHub account** at https://github.com (free).
2. Click **+ → New repository**. Name it `staystrung` (anything works). Set it to **Public**. Click **Create repository**.
3. On the new repo page, click **uploading an existing file**. Drag in **everything inside this folder**
   (index.html, sessions.html, membership.html, the css, js, assets and get-strung folders, favicon.svg, .nojekyll).
   Click **Commit changes**.
   *Tip: on a Mac, press Cmd+Shift+. in Finder to show the hidden `.nojekyll` file.*
4. Go to **Settings → Pages**. Under **Build and deployment** choose **Deploy from a branch**, branch **main**, folder **/ (root)**. Click **Save**.
5. Wait a minute or two. Your site will be live at
   `https://YOUR-USERNAME.github.io/staystrung/`

### Using staystrung.com (so the QR codes work)

The flier and postcard QR codes go to `staystrung.com/get-strung`. For those to work you need to own
the domain (about $10–15/yr from Namecheap, Squarespace Domains, Cloudflare, etc.) and point it at GitHub:

1. In the repo: **Settings → Pages → Custom domain** → type `staystrung.com` → **Save**.
   (GitHub adds a `CNAME` file for you.)
2. At your domain company, add these DNS records:
   - Four **A** records for `@` pointing to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record for `www` pointing to `YOUR-USERNAME.github.io`
3. After DNS updates (can take a few hours), tick **Enforce HTTPS** in Settings → Pages.

Then `https://staystrung.com/get-strung/?src=flyer` opens the Get Strung page.

---

## The booking form

Right now, **Send request** opens the customer's email app with a message to
staystrungtennis@gmail.com already filled in (service, racquet, strings, tension, pickup, date…).
It works with zero setup.

**Better: get requests straight to your inbox (free).**
1. Sign up at https://formspree.io (free plan = 50 submissions/month).
2. Create a form, and copy its endpoint — it looks like `https://formspree.io/f/abcdwxyz`.
3. Open `js/main.js` and paste it in the first setting:
   `const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";`
4. Upload the changed file to GitHub. Done — customers see a "You're on the list" message, and you get an email.

Each request also says where the customer came from (`flyer`, `card`, or `website`),
so you can see if the park fliers are working.

**Later, if you want real calendar booking + payments**, Square Appointments and Calendly both
have free plans. Make an account, then point the "Book a stringing" buttons at your booking link.

---

## Editing

- **Words:** open any `.html` file in a text editor and change the text between the tags.
- **Prices:** in `membership.html`, search for `$80`, `$150`, `$250`.
- **Colors:** top of `css/style.css` (`--green`, `--lime`, `--mauve`, `--cream`).
- After editing, upload the changed file to GitHub again (same "Add file → Upload files" button). The site updates in about a minute.
