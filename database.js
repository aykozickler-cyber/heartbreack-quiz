/**
 * DATABASE MODULE
 * Handles data collection and storage for quiz responses
 * Supports: Supabase, Firebase, Webhook, and localStorage
 */

const QuizDatabase = {
    
    /**
     * Initialize database connection
     */
    init: function() {
        if (!QUIZ_CONFIG.enableDataCollection) {
            console.log('Data collection is disabled');
            return;
        }
        
        const method = QUIZ_CONFIG.dataCollectionMethod;
        
        if (method === 'supabase' && QUIZ_CONFIG.supabase.enabled) {
            this.initSupabase();
        } else if (method === 'firebase' && QUIZ_CONFIG.firebase.enabled) {
            this.initFirebase();
        }
    },
    
    /**
     * Initialize Supabase
     */
    initSupabase: function() {
        if (typeof supabase === 'undefined') {
            console.warn('Supabase SDK not loaded. Add supabase script to your HTML.');
            return;
        }
        
        const config = QUIZ_CONFIG.supabase;
        
        if (!config.projectUrl || config.projectUrl === 'YOUR_SUPABASE_PROJECT_URL') {
            console.warn('Supabase configuration not set in config.js');
            console.warn('Get your Supabase credentials from: https://supabase.com');
            return;
        }
        
        try {
            // Initialize Supabase client
            window.supabaseClient = supabase.createClient(
                config.projectUrl,
                config.anonKey
            );
            
            console.log('Supabase initialized successfully');
        } catch (error) {
            console.error('Supabase initialization error:', error.message);
        }
    },
    
    /**
     * Initialize Firebase
     */
    initFirebase: function() {
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK not loaded. Add Firebase script to your HTML.');
            return;
        }
        
        const config = QUIZ_CONFIG.firebase;
        
        if (!config.apiKey || config.apiKey === 'YOUR_FIREBASE_API_KEY') {
            console.warn('Firebase configuration not set in config.js');
            return;
        }
        
        try {
            firebase.initializeApp({
                apiKey: config.apiKey,
                databaseURL: config.databaseURL,
                projectId: config.projectId
            });
            
            console.log('Firebase initialized successfully');
        } catch (error) {
            console.error('Firebase initialization error:', error.message);
        }
    },
    
    /**
     * Save quiz response to database
     * @param {string} email - User's email
     * @param {string} quizResult - Personality type result
     */
    saveResponse: function(email, quizResult) {
        if (!QUIZ_CONFIG.enableDataCollection) {
            console.log('Data collection disabled - data not saved');
            return Promise.resolve();
        }
        
        const method = QUIZ_CONFIG.dataCollectionMethod;
        
        switch (method) {
            case 'supabase':
                return this.saveToSupabase(email, quizResult);
            case 'firebase':
                return this.saveToFirebase(email, quizResult);
            case 'webhook':
                return this.sendToWebhook(email, quizResult);
            case 'localStorage':
                return this.saveToLocalStorage(email, quizResult);
            default:
                console.warn('Unknown data collection method:', method);
                return Promise.resolve();
        }
    },
    
    /**
     * Save to Supabase
     */
    saveToSupabase: function(email, quizResult) {
        return new Promise((resolve, reject) => {
            if (!window.supabaseClient) {
                reject(new Error('Supabase not initialized'));
                return;
            }
            
            const data = {
                email: email,
                quiz_result: quizResult,
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent.substring(0, 255)
            };
            
            window.supabaseClient
                .from('quiz_responses')
                .insert([data])
                .then((response) => {
                    if (response.error) {
                        console.error('Supabase error:', response.error.message);
                        reject(response.error);
                    } else {
                        console.log('Data saved to Supabase successfully');
                        resolve({ success: true, method: 'supabase' });
                    }
                })
                .catch((error) => {
                    console.error('Supabase save error:', error);
                    reject(error);
                });
        });
    },
    
    /**
     * Save to Firebase Realtime Database
     */
    saveToFirebase: function(email, quizResult) {
        return new Promise((resolve, reject) => {
            if (typeof firebase === 'undefined') {
                reject(new Error('Firebase not loaded'));
                return;
            }
            
            const database = firebase.database();
            const timestamp = new Date().toISOString();
            
            const data = {
                email: email,
                quizResult: quizResult,
                timestamp: timestamp,
                userAgent: navigator.userAgent.substring(0, 255)
            };
            
            const newRef = database.ref('quiz_responses').push();
            
            newRef.set(data)
                .then(() => {
                    console.log('Data saved to Firebase successfully');
                    resolve({ success: true, method: 'firebase' });
                })
                .catch((error) => {
                    console.error('Firebase save error:', error);
                    reject(error);
                });
        });
    },
    
    /**
     * Send data via webhook
     */
    sendToWebhook: function(email, quizResult) {
        return new Promise((resolve, reject) => {
            const url = QUIZ_CONFIG.webhook.url;
            
            if (!url || url === 'https://your-webhook-endpoint.com/collect') {
                reject(new Error('Webhook URL not configured in config.js'));
                return;
            }
            
            const data = {
                email: email,
                quizResult: quizResult,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent.substring(0, 255)
            };
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) throw new Error('Webhook request failed');
                return response.json();
            })
            .then(result => {
                console.log('Data sent to webhook successfully');
                resolve({ success: true, method: 'webhook' });
            })
            .catch((error) => {
                console.error('Webhook send error:', error);
                reject(error);
            });
        });
    },
    
    /**
     * FIX #5: Check if localStorage is available (not in private browsing)
     */
    isLocalStorageAvailable: function() {
        try {
            const testKey = '__localStorage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            console.warn('LocalStorage not available (private browsing mode?):', error.message);
            return false;
        }
    },
    
    /**
     * Save to browser's local storage (for testing)
     */
    saveToLocalStorage: function(email, quizResult) {
        return new Promise((resolve, reject) => {
            // FIX #5: Check if localStorage is available first
            if (!this.isLocalStorageAvailable()) {
                const error = new Error('LocalStorage is not available (private browsing mode)');
                console.warn(error.message);
                // Don't reject - allow app to continue anyway
                resolve({ success: false, method: 'localStorage', reason: 'not_available' });
                return;
            }
            
            try {
                const quizResponses = JSON.parse(localStorage.getItem('quizResponses') || '[]');
                
                const data = {
                    email: email,
                    quizResult: quizResult,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent.substring(0, 255)
                };
                
                quizResponses.push(data);
                localStorage.setItem('quizResponses', JSON.stringify(quizResponses));
                
                console.log('Data saved to localStorage (testing mode)');
                resolve({ success: true, method: 'localStorage' });
            } catch (error) {
                console.error('localStorage save error:', error);
                reject(error);
            }
        });
    },
    
    /**
     * Get all collected responses (useful for testing)
     */
    getAllResponses: function() {
        if (QUIZ_CONFIG.dataCollectionMethod === 'localStorage') {
            // FIX #5: Safe access to localStorage
            try {
                if (!this.isLocalStorageAvailable()) return [];
                return JSON.parse(localStorage.getItem('quizResponses') || '[]');
            } catch (error) {
                console.warn('Could not retrieve responses:', error);
                return [];
            }
        }
        console.warn('getAllResponses only works with localStorage method');
        return [];
    },
    
    /**
     * Clear all responses (for testing/cleanup)
     */
    clearResponses: function() {
        if (QUIZ_CONFIG.dataCollectionMethod === 'localStorage') {
            // FIX #5: Safe access to localStorage
            try {
                if (!this.isLocalStorageAvailable()) {
                    console.warn('Cannot clear responses - localStorage not available');
                    return;
                }
                localStorage.removeItem('quizResponses');
                console.log('localStorage responses cleared');
            } catch (error) {
                console.warn('Could not clear responses:', error);
            }
        }
    }
};

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        try {
            QuizDatabase.init();
        } catch (error) {
            console.error('Error initializing QuizDatabase:', error);
        }
    });
} else {
    try {
        QuizDatabase.init();
    } catch (error) {
        console.error('Error initializing QuizDatabase:', error);
    }
}
