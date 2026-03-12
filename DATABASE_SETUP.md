# Database Setup Guide

This guide explains how to set up data collection for your quiz app.

## 📊 Overview

Your quiz can collect user data (email + quiz results) in three ways:

1. **Firebase** (Recommended) - Cloud database, free tier available
2. **Webhook** - Send data to your own backend or service
3. **localStorage** - Store locally in browser (for testing only)

---

## 🔥 Option 1: Firebase Realtime Database (Recommended)

Firebase is the easiest way to collect data. It's free for small projects.

### Step 1: Create a Firebase Account

1. Go to **https://firebase.google.com**
2. Click **"Get Started" or "Go to Console"**
3. Sign in with Google account (create one if needed)
4. Click **"Create a project"** (or "Add project")
5. Name it: `quiz-app` (or any name you prefer)
6. Accept terms → **Create Project** → Wait for setup (1-2 min)

### Step 2: Get Your API Keys

1. In Firebase Console, click the **gear icon** (⚙️) in top-left → **Project Settings**
2. Go to the **"General"** tab
3. Scroll down to find:
   - **Web API Key** (looks like: `AIzaSyD...`)
   - **Project ID** (looks like: `quiz-app-12345`)
   - Copy these

### Step 3: Create Realtime Database

1. In Firebase Console left sidebar, click **"Realtime Database"** (under "Build")
2. Click **"Create Database"**
3. Choose location: **United States** (or closest to you)
4. Security rules: Select **"Start in test mode"** 
5. Click **"Enable"**
6. Copy the URL from the top (looks like: `https://quiz-app-12345.firebaseio.com`)

### Step 4: Update your config.js

Open `config.js` and update the Firebase section:

```javascript
firebase: {
    enabled: true,
    apiKey: 'AIzaSyD...',  // Your API Key from Step 2
    databaseURL: 'https://quiz-app-12345.firebaseio.com',  // From Step 3
    projectId: 'quiz-app-12345'  // From Step 2
}
```

### Step 5: Set Security Rules (IMPORTANT)

Your Firebase database needs rules to prevent unauthorized access:

1. In Firebase Console, go to **Realtime Database**
2. Click **"Rules"** tab at the top
3. Replace the content with:

```json
{
  "rules": {
    "quiz_responses": {
      ".write": true,
      ".read": "root.child('admin').val() === true"
    }
  }
}
```

4. Click **"Publish"**

This allows:
- ✅ Anyone can submit quiz data (`.write`: true)
- ✅ Only you can read the data (`.read`: requires admin flag)

### Step 6: Enable Data Collection in config.js

```javascript
enableDataCollection: true,
dataCollectionMethod: 'firebase'
```

### ✅ Done! 

Your quiz will now save all responses to Firebase. You can view them in the Firebase Console.

---

## 🌐 Option 2: Webhook (Send Data Elsewhere)

If you want to send data to your own server or webhook service:

### Using Webhook.site (Free, Easy)

1. Go to **https://webhook.site**
2. Copy the **Unique URL** (no signup needed!)
3. Update `config.js`:

```javascript
dataCollectionMethod: 'webhook',
webhook: {
    enabled: true,
    url: 'https://webhook.site/your-unique-url-here'  // Paste your webhook URL
}
```

4. Enable data collection:
```javascript
enableDataCollection: true
```

### Receiving Data

When users submit emails, you'll see JSON data like:

```json
{
  "email": "john@example.com",
  "quizResult": "rationalizer",
  "timestamp": "2026-02-19T10:30:00.000Z",
  "userAgent": "Mozilla/5.0..."
}
```

### Alternative: Your Own Backend

If you have your own server:
1. Add a `POST /api/quiz` endpoint that accepts the JSON above
2. Set the URL in config.js:

```javascript
url: 'https://your-domain.com/api/quiz'
```

---

## 💾 Option 3: localStorage (Testing Only)

For local testing without external services:

```javascript
dataCollectionMethod: 'localStorage',
enableDataCollection: true
```

### View Collected Data

Open browser DevTools (F12):
1. Go to **Application** tab
2. Click **Local Storage**
3. Find **quizResponses** 
4. It's a JSON array of all submissions

### Export Data

In browser console:
```javascript
copy(localStorage.getItem('quizResponses'))
```

Paste in a text editor and save as `.json`

---

## 📋 Data Collected

All methods collect the same fields:

| Field | Content | Example |
|-------|---------|---------|
| `email` | User's email | `john@example.com` |
| `quizResult` | Personality type | `rationalizer` |
| `timestamp` | When submitted | `2026-02-19T10:30:00Z` |
| `userAgent` | Browser info | `Mozilla/5.0...` |

**NO IP address or location data is collected.**

---

## 🔐 Privacy Considerations

- ✅ Only voluntarily submitted data (user enters email)
- ✅ GDPR compliant (no IP tracking)
- ✅ Optional (can be disabled in config)
- ✅ Transparent (user sees privacy notice)

---

## 🚀 Accessing Your Data

### Firebase Console

1. Go to **https://console.firebase.google.com**
2. Select your project
3. Click **Realtime Database**
4. View JSON data in real-time
5. Export as JSON (three dots menu → Export)

### Webhook.site

1. Go back to your webhook.site URL
2. All submissions appear in list
3. Click each to view full details
4. Download as JSON

---

## ❓ Troubleshooting

### "Firebase not initialized" Error

- Check `config.js` has correct API Key, Database URL, and Project ID
- Verify Firebase SDK loaded (check DevTools)

### Data Not Saving

- Open browser console (F12) for error messages
- Check Firebase rules are set correctly
- Verify webhook URL is correct

### Need Help?

- Firebase: https://firebase.google.com/docs
- Webhook.site: Check their site for instructions
- Quiz app: Check `database.js` comments

---

## 📊 Best Practices

1. **Test Locally First**
   - Set `dataCollectionMethod: 'localStorage'`
   - Make sure quiz works without database
   - Then enable Firebase/webhook

2. **Secure Your Data**
   - Set proper Firebase rules
   - Use HTTPS only
   - Share product ID, not API key

3. **Privacy Law Compliance**
   - Add privacy policy page
   - Get user consent before collecting
   - Respect GDPR/CCPA requirements

4. **Monitor Submissions**
   - Check Firebase/Webhook regularly
   - Remove spam entries
   - Follow up with qualified leads

---

**Remember**: You're collecting real people's data. Be respectful, transparent, and secure! 🔒
