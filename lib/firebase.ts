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

let app: any = null
let auth: any = null
let db: any = null
let storage: any = null

if (typeof window !== "undefined") {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error("Firebase configuration is missing. Please check your environment variables.")
  }

  // Initialize Firebase only on client
  app = initializeApp(firebaseConfig)

  // Initialize Firebase services
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
}

export { app, auth, db, storage }

let firestoreConnectionInitialized = false

export const ensureFirestoreConnection = async () => {
  if (!db || firestoreConnectionInitialized) {
    return
  }

  try {
    await enableNetwork(db)
    firestoreConnectionInitialized = true
    console.log("[v0] Firestore network enabled successfully")
  } catch (error) {
    // Some browsers can throw if called while already enabled; keep this quiet.
    console.warn("[v0] Error enabling Firestore network (safe to ignore if already enabled):", error)
  }
}

if (typeof window !== "undefined") {
  ;(async () => {
    try {
      if (db) {
        await enableIndexedDbPersistence(db)
        console.log("[v0] Firestore persistence enabled")
      }
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
