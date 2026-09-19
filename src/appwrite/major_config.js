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

// for new codes like me : 
// Purpose: Appwrite database --> Text/Metadata
//          Appwrite bucket/file --> Images/Files

// DATA FLOW :
// 1. Media Upload: User select image -> uploadFile() -> Storage Bucket saves raw binary file -> Returns unique "fileId".
// 2. Post Creation: UI passes post data + "fileId" (as featuredImage) -> createPost() -> Saves document in DB where "documentId" = "slug".
// 3. Render/Display: UI fetches post -> calls getFilePreview(fileId) -> Appwrite constructs direct image URL -> Renders in <img /> tag.
 




    // Database part : Post CRUD Operations

    async createPost({title, content, featuredImage,status,userId, slug}){
        try{
            const blobPost = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,

                // ID.unique(), // treat documentId
                // dont gonna work with documentID
// when user creates blog, url also generate example : myblog.com/post/react-js-guide. thats is slug if i use ID.unique() it generate random string(65f1a2b3...)
                slug,
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

    async updatePost( slug, {title, content, featuredImage,status, }){
        try{
            const updatePost = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // ID.unique(),
// if i want to edit a post and create another quiqueID , it becomes one of major juju, so again pass slug                
                slug,
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

    async deletePost(slug){
        try{
            const deletePost = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // ID.unique() -- > same reason,
                slug,

            )
            if(deletePost){
                return true
            }
            return false

        }catch(err){
            console.error("deletePost: ", err)
        }
    }

    async getPost(slug){
        try{
            const getPost = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // ID.unique() -- >same bug, same reason, same fix
                slug,
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

    // File Storage (Bucket) part: 

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
    // file prefiew service need it because UI render that blog image, remember no async or await cause in getFilePreview method
    // appwite give a fileId in response of uploadFile method


    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }



}


const services = new storageService()
export default services