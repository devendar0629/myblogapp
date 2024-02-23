const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritePostsCollectionId: String(import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID),
    appwriteCommentsCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
}

export default config