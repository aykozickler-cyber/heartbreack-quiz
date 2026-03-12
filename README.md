# Breakup Recovery Quiz

A conversion-optimized quiz funnel for generating leads and selling recovery guides.

## 📋 Quick Setup

### 1. **Configure Your Payment Details**

Edit `config.js` and update with your Gumroad information:

```javascript
const QUIZ_CONFIG = {
    gumroadUsername: 'YOUR_GUMROAD_USERNAME',  // e.g., "johnsmith"
    gumroadProductId: 'YOUR_PRODUCT_ID',       // e.g., "abc123xyz"
    price: '€1.99',
    quizTitle: 'Get Her Back Recovery Quiz',
    guidePages: 27
};
```

**How to find your Gumroad details:**
- Go to your Gumroad sales page URL: `https://YOURUSERNAME.gumroad.com/l/PRODUCTID`
- Enter your username in `gumroadUsername`
- Enter your product ID in `gumroadProductId`

### 2. **Run Locally**

```bash
# Navigate to the project directory
cd heartbreack-quiz

# Start a local server
python3 -m http.server 8000
```

Then visit: `http://localhost:8000/`

## 🎯 Quiz Flow

1. **Index Page** - Landing with social proof and trust signals
2. **Quiz Page** - 10-question personality assessment
3. **Email Capture** (Step 1/3) - Get email with social proof
4. **Teaser Results** (Step 2/3) - Show preview with lock overlay
5. **Payment** (Step 3/3) - Unlock full access via Gumroad

## 🔐 Privacy & Security

- **NO IP tracking** - The app doesn't collect IP addresses
- **NO browser fingerprinting** - No device tracking
- **NO cookies** - Uses localStorage only for quiz progress
- **Email only** - Only email is collected (user provides it voluntarily)
- **NO personal identifiers** - All personal information removed from code

All configuration is stored in `config.js` - easy to customize!

## 📁 File Structure

```
├── index.html           # Landing page
├── quiz.html           # Quiz page
├── results-new.html    # Email capture + teaser + payment
├── results.html        # Legacy results page
├── quiz.css            # Quiz styling
├── results.css         # Results & email styling
├── style.css           # Global styles
├── script.js           # Quiz logic
├── config.js           # YOUR SETTINGS - Update this!
└── README.md          # This file
```

## 🎨 Customization

### Change Quiz Questions
Edit `script.js` - Update the `questions` array with your own questions and scoring weights.

### Change Colors & Branding
Edit `style.css` - Update CSS variables:
```css
:root {
    --primary: #8B5CF6;      /* Primary brand color */
    --secondary: #EC4899;     /* Secondary brand color */
    --dark: #1F2937;
    --gray: #6B7280;
}
```

### Change Personality Types
Edit `results-new.html` - Search for `resultData` object and update personality types and descriptions.

### Change Email Copy
Edit `results-new.html` - Update the email capture section text, benefits, and testimonials.

## 🚀 Deploy

### Deploy to Netlify (Free)
1. Create a `netlify.toml` file in the root:
```toml
[build]
  publish = "."
  command = ""

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Push to GitHub and connect to Netlify

### Deploy to Vercel
Simply push to GitHub - Vercel will detect the static files automatically.

### Deploy to Any Web Host
Simply upload all files to your web hosting provider.

## 💡 Tips for Higher Conversions

1. **Use Real Testimonials** - Replace placeholder testimonials with real user quotes
2. **Update Privacy Policy** - Add your own privacy policy to comply with GDPR/CCPA
3. **Test Everything** - Go through the entire flow before launching
4. **Monitor Analytics** - Add Google Analytics to track conversion rates
5. **Mobile First** - Test on mobile devices extensively
6. **A/B Test** - Try different headlines and CTA text

## ⚠️ Important Notes

- Update `config.js` with your Gumroad details before deploying
- Test payment flow before launching
- Keep the quiz questions psychology-based for better results
- Customize testimonials to match your audience
- Add your own privacy policy and terms of service

## 📊 What Gets Stored

**Local Storage (User's Device)**
- `userEmail` - User's email address
- `quizResult` - Personality type (e.g., "rationalizer")
- `quizStartTime` - When the quiz was started
- `abandonedCart` - Whether user abandoned the sale

**NO information is sent to external servers** except:
- Email to Gumroad (when payment redirect happens)

## 🤝 Support

This app collects minimal data and doesn't track personal information. All configuration is done in one file (`config.js`) for transparency.

---

**Remember**: Always be transparent about data collection and comply with privacy laws in your jurisdiction.
