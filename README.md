# Gilang Fresh Juice Manager.

Sistem Tata Kelola Gerai Jus â€” PWA dengan Push Notification & Auto Deploy.

## ðŸš€ Tech Stack

- Next.js 14 (App Router)
- Supabase (Database + Auth + Edge Functions)
- Cloudflare Pages (Hosting)
- GitHub Actions (Auto Deploy)
- PWA (Service Worker + Push Notification)

## ðŸ“¦ Features

- [x] Login dengan kode akses (Owner / Partner)
- [x] Manajemen penjualan & stok
- [x] Laporan harian & target penjualan
- [x] Push notification (stok habis, target tercapai)
- [x] PWA â€” installable di Android/iOS
- [x] Offline support

## ðŸ” Auth Kode Akses

| Role | Kode |
|------|------|
| Owner | `Gilang_go` |
| Partner | `yowes123` |

## ðŸŒ Live URL

https://gilang88freshjuice.pages.dev

## ðŸ› ï¸ Deploy

Build otomatis via GitHub Actions â†’ Cloudflare Pages.

```
git push origin main  â†’  GitHub Actions build  â†’  Cloudflare Pages live
```

## ðŸ“ Project Structure

```
â”œâ”€â”€ app/                    # Next.js App Router
â”‚   â”œâ”€â”€ (auth)/login/       # Login page
â”‚   â””â”€â”€ (dashboard)/        # Dashboard, Sales, Stock, Settings
â”œâ”€â”€ components/             # React components
â”œâ”€â”€ lib/
â”‚   â”œâ”€â”€ push.ts             # Push notification helper
â”‚   â””â”€â”€ supabase/           # Supabase client
â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ manifest.json         # PWA manifest
â”‚   â”œâ”€â”€ sw-custom.js          # Service Worker
â”‚   â””â”€â”€ icons/                # PWA icons
â”œâ”€â”€ stores/                 # Zustand stores
â”œâ”€â”€ supabase/
â”‚   â””â”€â”€ functions/send-push/  # Supabase Edge Function
â””â”€â”€ .github/workflows/
    â””â”€â”€ deploy.yml            # Auto deploy to Cloudflare Pages
```

## ðŸ”‘ Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
```

## ðŸ“„ License

Private â€” Gilang Fresh Juice
