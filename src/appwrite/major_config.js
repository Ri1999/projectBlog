import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

// docs from database APi appwrite
export class storageService{

    client = new Client()
    databases
    bucket

    constructor(){
        this.client.setProject(conf.appwriteProjectId).setEndpoint(conf.appwriteUrl)
        this.databases = new Databases(this.client)
        this.bucket    = new Storage(this.client)


    }

    async createPost({title, content, featuredImage,status,userId }){
        try{
            const blobPost = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(), // treat documentId
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

            if(blobPost){
                return blobPost
            }
            return null

        }catch(err){
            console.error("createPost: ", err)
        }
    }

    async updatePost({title, content, featuredImage,status, }){
        try{
            const updatePost = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    

                }
            )
            if(updatePost){
                return updatePost
            }
            return null

        }catch(err){
            console.error("updatePost: ", err)
        }
    }

    async deletePost(){
        try{
            const deletePost = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
            )
            if(deletePost){
                return true
            }
            return false

        }catch(err){
            console.error("deletePost: ", err)
        }
    }

    async getPost(){
        try{
            const getPost = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique()
            )
            if(getPost){
                return getPost
            }
            return null

        }catch(err){
            console.error("getPost: ", err)
        }
    }

    // if status active then show all post
    async allPost( queries = [Query.equal("status","active")]){
        try{
            const allPost = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
                // need pegination in future or later
            )
            if(allPost){
                return allPost
            }
            return null

        }catch(err){
            console.error("allPost: ", err)
        }
    }

    // file uploading services

    async uploadFile(file){
        try{
            const uploadFile = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            ) 
            return uploadFile

        }catch(err){
            console.error("createFile: ", err)
        }
    }
    async deleteFile(fileID){

        try{
            const deleteFile  = await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            if(deleteFile){
                return deleteFile
            }
            return false

        }catch(err){
            console.error("deleteFile: ", err)
        }

    }



}


const services = new storageService()
export default services