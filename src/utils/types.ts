/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormData {
  email: string;
  password: string;
  phone: string;
}

export interface PostFormData {
  [key: string]: any;
}
// Interface for additional user details
export interface MoreDetails {
  fullName: string;
  address: string;
  country: string;
  weight: string;
  height: string;
  age: string;
}
export interface PostData {
  author: string;
  [key: string]: any;
}

export interface UserData {
  fullName: string;
  [key: string]: any;
}

export interface PostWithAuthor extends PostData {
  id: string;
  createdBy: string | undefined;
}
export type HandlePostsUpdate = (posts: PostWithAuthor[]) => void;
