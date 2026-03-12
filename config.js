/**
 * QUIZ CONFIGURATION FILE
 * ======================================
 * Update your settings here for payment and data collection
 */

const QUIZ_CONFIG = {
    // === PAYMENT CONFIGURATION ===
    // Your Gumroad username (without "gumroad.com")
    // Example: if your link is "myname.gumroad.com", enter "myname"
    gumroadUsername: 'alltimequiz',

    // Your Gumroad product ID from your sales page URL
    // Example: if your link is "myname.gumroad.com/l/abc123", enter "abc123"
    gumroadProductId: 'rtudaz',
    price: '€1.99',
    
    // Quiz title
    quizTitle: 'Get Her Back Recovery Quiz',
    
    // Number of pages in your recovery guide
    guidePages: 27,
    
    // === DATA COLLECTION CONFIGURATION ===
    // Enable/disable data collection from quiz users
    enableDataCollection: true,
    
    // Choose where to send collected data:
    // Options: 'supabase', 'firebase', 'webhook', 'localStorage' (for local testing)
    dataCollectionMethod: 'supabase',
    
    // Supabase Configuration (PostgreSQL backend) - RECOMMENDED
    supabase: {
        enabled: true,
        projectUrl: 'https://uhhnrgbefiyqtayijyei.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoaG5yZ2JlZml5cXRheWlqeWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MzM4MzEsImV4cCI6MjA4NzEwOTgzMX0.fK7ni1lFeGeO8Q2GmQkLEVe4gzzxrmZ2tYimvUAn11o'
    },
    
    // Firebase Configuration (if using Firebase)
    firebase: {
        enabled: false,
        apiKey: 'YOUR_FIREBASE_API_KEY',
        databaseURL: 'YOUR_FIREBASE_DATABASE_URL',
        projectId: 'YOUR_FIREBASE_PROJECT_ID'
    },
    
    // Webhook URL (if using webhook for data collection)
    webhook: {
        enabled: false,
        url: 'https://your-webhook-endpoint.com/collect'
    },
    
    // Show privacy notice to users
    showPrivacyNotice: true,
    privacyNoticeText: 'Your email and quiz results are stored securely to personalize your experience and send you helpful follow-ups.'
};

/**
 * SETUP INSTRUCTIONS:
 * ==================
 * 
 * 1. PAYMENT SETUP (Gumroad):
 *    - Create a product on gumroad.com
 *    - Copy your sales link: https://username.gumroad.com/l/productid
 *    - Update gumroadUsername and gumroadProductId above
 * 
 * 2. DATA COLLECTION SETUP (Supabase - RECOMMENDED):
 *    Step A: Create Supabase Project
 *    - Go to https://supabase.com
 *    - Click "Start your project"
 *    - Sign up/login with GitHub, Google, or email
 *    - Click "New Project"
 *    - Name it: "quiz-app" (or any name)
 *    - Set a strong password
 *    - Choose region closest to you
 *    - Click "Create new project" (wait 1-2 minutes for setup)
 *    
 *    Step B: Get Your Credentials
 *    - In Supabase Dashboard, click "Settings" (gear icon)
 *    - Go to "API" tab
 *    - Copy "Project URL" → paste into projectUrl
 *    - Copy "anon public" key → paste into anonKey
 *    
 *    Step C: Create Table for Quiz Responses
 *    - Go to "SQL Editor" in left sidebar
 *    - Click "New Query"
 *    - Paste this SQL:
 *    
 *    CREATE TABLE quiz_responses (
 *        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *        email TEXT NOT NULL,
 *        quiz_result TEXT NOT NULL,
 *        timestamp TIMESTAMP DEFAULT NOW(),
 *        user_agent TEXT,
 *        created_at TIMESTAMP DEFAULT NOW()
 *    );
 *    
 *    ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
 *    
 *    CREATE POLICY "Allow inserts" ON quiz_responses
 *        FOR INSERT WITH CHECK (true);
 *    
 *    - Click "Run"
 *    
 *    Step D: Enable in config.js
 *    - Set enableDataCollection: true
 *    - Set dataCollectionMethod: 'supabase'
 *    - Fill in your supabase credentials above
 * 
 * 3. DATA COLLECTION SETUP (Firebase):
 *    - Go to https://firebase.google.com
 *    - Create a new project
 *    - Get your API credentials from Project Settings
 *    - Set dataCollectionMethod: 'firebase'
 *    - (See DATABASE_SETUP.md for detailed steps)
 * 
 * 4. DATA COLLECTION SETUP (Webhook):
 *    - Use a service like https://webhook.site or https://hookbin.com
 *    - Set dataCollectionMethod: 'webhook'
 *    - Set webhook.url to your endpoint
 *    - Data will be sent as JSON POST request
 * 
 * 5. TESTING (localStorage):
 *    - Set dataCollectionMethod: 'localStorage'
 *    - Data saved in browser only
 *    - Check browser DevTools → Application → localStorage
 * 
 * DATA COLLECTED:
 * - email (user voluntarily enters)
 * - quizResult (personality type: rationalizer, devastated, seeker)
 * - timestamp (when data was submitted)
 * - userAgent (browser info - helps with analytics)
 * 
 * NO IP ADDRESSES or location data is collected.
 * All data is securely encrypted in transit and at rest.
 */
