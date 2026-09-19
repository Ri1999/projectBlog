// env details
import conf from "../conf/conf";

// this part came from apwrite docs(email/password docs)
// url - https://appwrite.io/docs/products/auth/email-password
// but we need improvement in code to save from vendor lockin
import { Client, Account, ID } from 'appwrite';

export class blogAuthService {

   client = new Client() // import appwrite

   account;

   // need why use constucutor, what is constructor?
   // Object bante hi automatic chalega aur Appwrite connect karega

   constructor(){

    this.client.setProject(conf.appwriteProjectId).setEndpoint(conf.appwriteUrl) ;// setProject and setEndpoint both from appwrite

    this.account = new Account(this.client)

   }

   async createAccount ({email, password, name}){
   // obviously async as per documentaion
   // passing arguemnts and destructure it 

   try{

    const userAccount = await this.account.create(ID.unique(), email, password, name)
    if(userAccount){
        // return userAccount

        // call another method -> if userAccount exist then login right?

        return this.login({email,password});

    }else{
        return userAccount
    }

   }catch(err){
    console.error("createAccount: ",err)
    // throw err
   }


}

async login({email, password}){
    try{
        const mylogin = await this.account.createEmailPasswordSession(email,password)
        return mylogin
    }catch(err){
        console.error("login: ",err)
        throw err
    }
}

async getCurrentUser(){
    try{

        const currentUser =  await this.account.get() // this also appwrite docs
        if(currentUser){
            return currentUser
        }
        return null

    }catch(err){
        console.error("getCurrentUser: ",err)
        // throw err
        return null
    }
    
}

async logout(){
    try{
        await this.account.deleteSessions()
    }catch(err){
        console.error("logout: ",err)
    }
}

async passwordRecovery({email,url}){
    try{
        const recovery = await this.account.createRecovery(email,url)
        if(recovery){
            return this.confirmRecovery({email})
        }
        return null
        
    }catch(err){
        console.error("passwordRecovery: ",err)
    }
    
}

async confirmRecovery({userId, secret, password, passwordAgain}){
    try{
        const confirmRecovery = await this.account.updateRecovery(userId, secret, password, passwordAgain)

        return confirmRecovery
    }catch(err){
        console.error("confirmRecovery: ",err)
    }
}



}

const blogauthservice = new blogAuthService() // OBJECT CREATION: Class se object banane ke liye 'new' keyword zaroori hai.

// then use it like blogauthservice.

// then we need client and another is account


export default blogauthservice
