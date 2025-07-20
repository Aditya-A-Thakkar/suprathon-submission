# Eventory – The One-Stop Event Hub for Communities

Built for **Suprathon '25**, Eventory is a full-stack, production-ready platform for posting and discovering events in any community – universities, clubs, or online groups.

> Think of it as a smarter, friendlier, and more organized alternative to Discord spam or Notion boards.

---

## Features

### User-POV
- ✅ **Login / Register**
- 🔒 **Secure Auth** with `Remember Me` option
- 💬 **Post Events** with title, time, tag, and contact info
- 📆 **Auto-expiring Events** – old posts vanish automatically
- 📲 **Responsive UI**

### Admin-POV
- ✉️ **Forgot Password Flow** – sends a real recovery email
- 📨 **Email via Resend API** (Production-grade, not dev console hacks)
- 🧹 **Soft Delete Support** for non-admin users
- 🛠️ **Cron Jobs** to auto-clean up expired events
- 📦 Deployed with **Next.js App Router**, **PostgreSQL**, **Prisma**, and **Vercel**

---

## Production site

> https://eventory-x-dbd.vercel.app

---

## 🎯 The Problem

In college communities, events and announcements are:

- Lost in WhatsApp/Discord noise
- Scattered across forms, PDFs, or Google Sheets
- Forgotten due to lack of reminders or structure

---

## ✅ Our Solution

Eventory provides a centralized **event board** where:

- Students can post upcoming events (tech talks, fests, workshops)
- Events are tagged and sorted smartly
- Old events disappear automatically
- Admins have full control

---

## 🛠️ Tech Stack

| Tech            | Use                             |
|-----------------|---------------------------------|
| **Next.js 14**  | App Router, SSR                 |
| **Prisma**      | ORM for PostgreSQL              |
| **PostgreSQL**  | Hosted on Railway               |
| **Resend API**  | Email service (Forgot Password) |
| **MUI**         | Fully customized, responsive UI |
| **Vercel Cron** | Expiry cleanup job              |

---

## 💡 What Makes It Unique

- 🌌 **Dark-mode aware UI**, prevents system overrides
- 🕓 **Events expire automatically** – no clutter!
- 💬 **Production email** built in, not just console logs
- 🧠 **Clean UX** with snackbars and error handling

---

## 🧩 How to Run Locally

```bash
git clone https://github.com/Aditya-A-Thakkar/suprathon-submission.git
cd supraconnect

# Setup env variables in `.env` file
cp .env.example .env

# Install dependencies
npm install

# Setup DB
npx prisma generate
npx prisma migrate dev --name init

# Run app
npm run dev
````

---

## 📮 Submission Notes

* 🔒 We intentionally did not use Firebase/Auth0 — built full auth from scratch
* 📬 Google Sign-In attempted, but dropped to preserve production schema
* 🎯 We focused on clean code, deployment, and production readiness

---

## 🏁 Final Thoughts

Eventory is ready to be plugged into any student group, tech club, or community as a plug-and-play event hub.

We believe this is not just a hackathon project, but something deployable today 🚀

---

## 👨‍💻 Team

* **Aditya Thakkar** – Full-stack Developer
  *BS (Research) Computer Science, IISc Bangalore*
* **Shankhadeep Ghosh** – Full-stack Developer
  *BS (Research) Computer Science, IISc Bangalore*
* **Hasini G** – Full-stack Developer
  *BS (Research) Computer Science, IISc Bangalore*
* **Aditey Nandan** – Full-stack Developer
  *BS (Research) Computer Science, IISc Bangalore*
