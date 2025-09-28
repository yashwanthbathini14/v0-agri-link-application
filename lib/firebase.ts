// Firebase configuration and initialization
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, enableNetwork, enableIndexedDbPersistence } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Firebase configuration object
// You'll need to replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Firebase configuration is missing. Please check your environment variables.")
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export const ensureFirestoreConnection = async () => {
  try {
    await enableNetwork(db)
    console.log("[v0] Firestore network enabled successfully")
  } catch (error) {
    // Some browsers can throw if called while already enabled; keep this quiet.
    console.warn("[v0] Error enabling Firestore network (safe to ignore if already enabled):", error)
  }
}

if (typeof window !== "undefined") {
  ;(async () => {
    try {
      await enableIndexedDbPersistence(db)
      console.log("[v0] Firestore persistence enabled")
    } catch (error: any) {
      // failed-precondition: multiple tabs open / unimplemented: browser doesn't support
      if (error?.code !== "failed-precondition" && error?.code !== "unimplemented") {
        console.warn("[v0] Firestore persistence not enabled:", error)
      }
    }
    try {
      await ensureFirestoreConnection()
    } catch {
      // ensureFirestoreConnection logs internally
    }
  })()
}

export default app
