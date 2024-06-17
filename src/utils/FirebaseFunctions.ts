import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import {
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./Firebase";

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db: Firestore = getFirestore(app);

// Interface for form data used in registration and login
interface FormData {
  email: string;
  password: string;
  phone: string;
}

// Interface for additional user details
interface MoreDetails {
  fullName: string;
  address: string;
  country: string;
  weight: string;
  height: string;
  age: string;
}

// Function for registering a user
export const handleRegistration = async (formData: FormData): Promise<User> => {
  try {
    console.log("Attempting to create user with email:", formData.email);

    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user: User = userCredential.user;
    console.log("User created with UID:", user.uid);
    await setDoc(doc(db, "users", user.uid), {
      email: formData.email,
      phone: formData.phone,
      mobileVerified: false,
      firstLogin: true,
    });

    console.log("User data saved to Firestore for UID:", user.uid);
    return user;
  } catch (error) {
    console.error("Error during user registration:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

// Function for logging in a user
export const handleLogin = async (
  formData: Pick<FormData, "email" | "password">
): Promise<User> => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user: User = userCredential.user;
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

// Function to check if it's the user's first login
export const isFirstLogin = async (
  userId: string
): Promise<boolean | undefined> => {
  try {
    const userDocRef: DocumentReference<DocumentData> = doc(
      db,
      "users",
      userId
    );
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    return userData?.firstLogin;
  } catch (error) {
    console.error("Error checking first login:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

// Function to register additional user details
export const registerUserDetails = async (
  userId: string,
  formData: Partial<MoreDetails>
): Promise<void> => {
  try {
    const userDetailsRef: DocumentReference<DocumentData> = doc(
      db,
      "users",
      userId
    );
    // await updateDoc(userDetailsRef, formData as Record<string, string>);
    await updateDoc(userDetailsRef, { ...formData, firstLogin: false });
  } catch (error) {
    console.error("Error updating user details:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};
