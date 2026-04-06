# GDPA — Global Data Privacy Alliance

A demo privacy professional association site showcasing Piano site license capabilities, Piano ID login, and the My Account widget. Styled to match IAPP's professional design aesthetic.

## Quick Start

```bash
npm install
npm run dev
```

Visit: http://localhost:5173

## Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: Git push
# Connect your repo to Vercel — it auto-detects Vite and deploys.
```

Vercel will auto-detect the Vite framework. No additional configuration needed.

## Site Sections

- **Certifications** - Privacy professional credentials (CIPP/E, CIPM, CIPT, etc.)
- **Training** - Webinars and courses on GDPR, AI governance, privacy law
- **Resources** - Research reports, whitepapers, templates, tools
- **News** - Privacy industry updates and enforcement news
- **My Account** - Piano My Account widget integration

## Piano Integration

### Current Configuration

The site is pre-wired with Piano Application ID: `QiNgMM49pu`

Update in `index.html` and `src/GDPAAlliance.jsx` if using a different AID.

### Integration Points

| Feature | Piano API | Container ID |
|---------|-----------|--------------|
| Login | `tp.pianoId.show()` | `#piano-login-container` |
| My Account | `tp.myaccount.show()` | `#piano-my-account` |
| License Activation | `tp.offer.show()` | `#piano-license-container` |

### Wire Up Real Piano

Currently using mock login/license flows. To enable real Piano:

1. Uncomment Piano integration code in `GDPAAlliance.jsx`
2. Replace `handle*` functions with actual `tp.*` API calls
3. Configure site license offer template in Piano dashboard

## Demo Flow

1. **Browse Content** — Mix of open/locked articles, certifications, training
2. **Sign In** — Piano ID login (currently mocked)
3. **Hit Paywall** — Locked content prompts license activation
4. **Activate License** — Site license redemption flow
5. **Full Access** — All member content unlocked
6. **My Account** — Piano My Account widget shows subscription details

## Design

Styled to match IAPP's professional association aesthetic:
- **Primary Color**: IAPP Green (`#48843B`)
- **Typography**: Lato headings + Open Sans body
- **Layout**: Card-based modular system
- **Components**: Lock badges, hover states, professional nav

## Project Structure

```
├── index.html              # Entry point + Piano SDK script
├── src/
│   ├── main.jsx            # React mount
│   └── GDPAAlliance.jsx    # Main app component (single-file)
├── public/
│   └── favicon.svg
├── package.json
└── vite.config.js
```

## License

Demo site for Piano Site Licensing API demonstrations.
