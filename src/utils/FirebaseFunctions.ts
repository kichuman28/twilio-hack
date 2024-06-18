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
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getFirestore,
  onSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./Firebase";
import {
  FormData,
  HandlePostsUpdate,
  MoreDetails,
  PostData,
  PostFormData,
  PostWithAuthor,
  UserData,
} from "./types";

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage = getStorage(app);
// Interface for form data used in registration and login

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

export const createPost = async (
  formData: PostFormData,
  media: File | null
): Promise<void> => {
  const timestamp = Date.now();

  try {
    if (media) {
      const fileExtension = media.name.split(".").pop();
      const fileName = `posts/${timestamp}.${fileExtension}`;
      const fileRef = ref(storage, fileName);
      await uploadBytes(fileRef, media);
      const fileLink = await getDownloadURL(fileRef);
      const updatedFormData = {
        ...formData,
        timestamp,
        likes: [],
        mediaPath: fileLink,
      };
      await addDoc(collection(db, "posts"), updatedFormData);
    } else {
      const updatedFormData = { ...formData, timestamp, likes: [] };
      await addDoc(collection(db, "posts"), updatedFormData);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during complaint creation.");
  }
};

export const fetchPosts = (handlePostsUpdate: HandlePostsUpdate) => {
  const postsCollection = collection(db, "posts");

  return onSnapshot(
    postsCollection,
    async (postsSnapshot: QuerySnapshot<DocumentData>) => {
      const updatedPosts: PostWithAuthor[] = [];

      for (const postDoc of postsSnapshot.docs) {
        const postData = postDoc.data() as PostData;
        const postId = postDoc.id;
        const createdByAuthorId = postData.author;

        const userDoc = await getDoc(doc(db, "users", createdByAuthorId));
        const userData = userDoc.data() as UserData | undefined;

        const complaintWithAuthor: PostWithAuthor = {
          id: postId,
          createdBy: userData?.fullName,
          ...postData,
        };
        updatedPosts.push(complaintWithAuthor);
      }
      handlePostsUpdate([...updatedPosts]);
    }
  );
};

export const likePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while liking the post.");
  }
};

export const unlikePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while unliking the post.");
  }
};
