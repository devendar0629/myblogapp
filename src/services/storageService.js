import config from "../config/config"
import { Databases, Storage, Client, ID } from 'appwrite'

export class StorageService {
    client = new Client();
    storage;
    database;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.storage = new Storage(this.client)
        this.database = new Databases(this.client)
    }

    // <------------- POST SERVICES -------------->

    async createPost(postData, documentId = ID.unique(), ...args) {
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwritePostsCollectionId,
                documentId,
                postData
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async getPost(documentId) {
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwritePostsCollectionId,
                documentId
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async updatePost(documentId, postData) {
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwritePostsCollectionId,
                documentId,
                postData
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async deletePost(documentId) {
        try {
            return await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwritePostsCollectionId,
                documentId
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async getAllPosts(queries) {
        try {
            return this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwritePostsCollectionId,
                queries
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async editPost(documentId, newPostData) {
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwritePostsCollectionId,
                documentId,
                newPostData
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    // <------------- COMMENT SERVICES -------------->

    async createComment(commentData,commentId = ID.unique()){
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                commentId,
                commentData
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async getComment(commentId) {
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                commentId
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async getAllComments(queries = []){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                queries
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    // <------------- FILE SERVICES -------------->

    async uploadFile(file, fileId = ID.unique()) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                fileId,
                file
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    getFilePreview(fileId, width = 200, height = 200) {
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId,
            width,
            height
        )
    }

    getFileDownload(fileId) {
        return this.storage.getFileDownload(
            config.appwriteBucketId,
            fileId
        )
    }

    getFileView(fileId) {
        return this.storage.getFileView(
            config.appwriteBucketId,
            fileId
        )
    }

    // check whether it return current user's data or everyone's
    async getAllFiles(Queries = []) {
        try {
            return await this.storage.listFiles(
                config.appwriteBucketId,
                Queries
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }
}

const storageService = new StorageService()
export default storageService