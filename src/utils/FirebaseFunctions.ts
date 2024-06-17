import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./Firebase";

const auth = getAuth(app);
const db = getFirestore(app);

interface FormData {
  email: string;
  password: string;
  phone: string;
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

// Function for login
export const handleLogin = async (
  formData: Pick<FormData, "email" | "password">
): Promise<User> => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};
