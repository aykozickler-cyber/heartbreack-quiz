# Supabase Database Setup Guide

**You've chosen Supabase!** 🎉 Here's how to set it up in 5 minutes.

---

## 📚 What is Supabase?

Supabase is a **PostgreSQL database hosted in the cloud**. It's:
- ✅ Free tier available (perfect for starting)
- ✅ Based on real SQL (not proprietary)
- ✅ Real-time updates
- ✅ Secure & reliable
- ✅ Easy to use interface

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Create Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"** (or "Sign Up")
3. Log in with **GitHub, Google, or Email**
4. Click **"New Project"**

### Step 2: Create Your Project

1. **Name:** `quiz-app` (or any name)
2. **Password:** Create a strong database password (save this!)
3. **Region:** Choose closest to you (e.g., `us-east-1`)
4. Click **"Create new project"**
5. **Wait 1-2 minutes** for setup

### Step 3: Get Your Credentials

1. Once project loads, click ⚙️ **Settings** (bottom left)
2. Go to **API** tab
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxxxxx.supabase.co`)
   - **Anon Key** (long string starting with `eyJ...`)

### Step 4: Update config.js

Open `config.js` in your project and update:

```javascript
supabase: {
    enabled: true,
    projectUrl: 'YOUR_SUPABASE_PROJECT_URL',  // Paste Project URL here
    anonKey: 'YOUR_SUPABASE_ANON_KEY'         // Paste Anon Key here
}
```

Example:
```javascript
supabase: {
    enabled: true,
    projectUrl: 'https://abcd1234.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
}
```

### Step 5: Create Database Table

1. In Supabase, click **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Paste this SQL code:

```sql
CREATE TABLE quiz_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    quiz_result TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow inserts" ON quiz_responses
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Read only admin" ON quiz_responses
    FOR SELECT USING (false);
```

4. Click **"Run"** (top right)
5. Wait for "Success!" message

### ✅ Done!

Your quiz will now save all user emails and results to Supabase!

---

## 📊 View Your Data

### In Supabase Dashboard

1. Go to **Table Editor** (left sidebar)
2. Click **quiz_responses**
3. See all submitted data in real-time ✨

### What You'll See

When users complete the quiz, their data appears like this:

| ID | Email | Quiz Result | Timestamp |
|-------|---------|---------|---------|
| 550e... | john@example.com | rationalizer | 2026-02-19 10:30 |
| 6a2b... | jane@example.com | devastated | 2026-02-19 10:35 |

### Export Data

1. In **Table Editor**, click **...** (three dots)
2. Click **"Export as CSV"**
3. Save your data locally
4. Import to Excel, Google Sheets, or CRM

---

## 🔐 Security (Auto-Setup)

The SQL code above sets up security where:
- ✅ Anyone can submit quiz data (INSERT)
- ✅ Only you can read the data (SELECT)
- ✅ No modifications allowed
- ✅ No deletions allowed

This is secure for a public quiz!

---

## 🔄 Sync with Your CRM

### Send Data to Email/CRM Automatically:

Supabase has an API your CRM can use:

**Webhook (for Zapier, Make, etc.)**
```
POST https://YOUR_PROJECT.supabase.co/rest/v1/quiz_responses
Authorization: Bearer YOUR_ANON_KEY
Content-Type: application/json

{
  "email": "user@example.com",
  "quiz_result": "rationalizer"
}
```

**Popular CRM Integrations:**
- Zapier ✅
- Integromat (Make) ✅
- Pabbly Connect ✅
- Your own webhook ✅

---

## 📈 Monitor Submissions

### Track Your Success

1. **Dashboard:** See live submissions in real-time
2. **CSV Export:** Download weekly summaries
3. **Analytics:** Set up Zapier workflows for alerts
4. **Notifications:** Get email when new submissions arrive

---

## 🆘 Troubleshooting

### "Supabase not initialized" Error

**Solution:**
- Copy **exact** Project URL (including `https://`)
- Copy **exact** Anon Key (full string)
- No extra spaces or quotes
- Reload page (F5)

### Data Not Saving

**Check these:**
1. Open DevTools (F12) → Console tab
2. Look for error messages
3. Verify credentials are correct in config.js
4. Make sure you ran the SQL table creation
5. Check Supabase → Table Editor → quiz_responses exists

### "quiz_responses table not found"

**Solution:**
1. Go to Supabase SQL Editor
2. Run the SQL code again
3. Make sure it says "Success!"
4. Check Table Editor shows the table

---

## 💰 Pricing

### Free Tier (Perfect for Starting)
- ✅ 500MB database
- ✅ Up to 100k API calls/month
- ✅ Real-time features
- ✅ All features included
- ✅ **$0/month**

### Paid Plans (If You Scale)
- $25/month for 8GB storage
- $125/month for 32GB storage
- Shared Support included
- Email support on paid plans

**Start free, upgrade if needed!**

---

## 🧪 Test It Now

1. **Go to your quiz:** `http://localhost:8000/index.html`
2. **Complete quiz** with test email
3. **Go to email capture page** and enter test email (e.g., `test@example.com`)
4. **Check Supabase:**
   - Click **Table Editor**
   - Click **quiz_responses**
   - ✅ Your test data should appear!

---

## 📚 Learn More

- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Basics:** https://www.postgresql.org/docs/
- **Supabase API:** https://supabase.com/docs/reference/javascript

---

## 🚀 Next Steps

1. ✅ Get Supabase running
2. ✅ Create your quiz products on Gumroad
3. ✅ Deploy your quiz (Netlify, Vercel, etc.)
4. ✅ Test with real users
5. ✅ Monitor submissions
6. ✅ Follow up with qualified leads
7. ✅ Scale your business! 📈

---

**You're all set!** 🎉 Your quiz is collecting data automatically. Every user who enters their email will have their data saved to Supabase in real-time.

Good luck with your quiz! 💪
