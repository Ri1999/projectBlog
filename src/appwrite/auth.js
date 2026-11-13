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

        await this.login({email,password});

        // send her to verification component
        // const redirectLink= `${window.location.origin}/verify-email`

        // send her verification method
        // await this.signupConfirmVerification(redirectLink)

        return userAccount


    }else{
        // return userAccount
        return null
    }

   }catch(err){
    console.error("createAccount: ",err.message)
    // throw err
   }


}

// after new singup email, verfiy confirm?

async signupConfirmVerification({userId, secret}){
    try{
        return await this.account.updateVerification(userId, secret);
    }catch(err){
        console.error("signupConfirmVerification: ", err.message)
        throw err;
    }
}





async login({email, password}){
    try{
        const mylogin = await this.account.createEmailPasswordSession(email,password)
        return mylogin
    }catch(err){
        console.error("Login Error: ",err.message)
        // throw err
        if(err.code === 401 || err.type === "user_invalid_credentials"){
            throw new globalThis.Error("Invalid email or password. Please double-check your details or create a new account.");
        }
        if(err.code === 429){
            throw new globalThis.Error("Too many login attempts. Take a breather and try again in a few minutes.")
        }
        throw new globalThis.Error("Something went wrong while logging in. Please try again.")

    }
}

// Oauth login read from appwrite docs

async loginWithOAuth(provider="google"){
    try{
        // no await 
        return this.account.createOAuth2Session(provider,
            `${window.location.origin}/`, // successful url
            `${window.location.origin}/login` // failed url
        )
    }catch(err){
        console.error("loginWithOAuth Error: ", err.message)
        throw err
    }
}

// Send Email Verification

async sendEmailVerification(url){
    try{
        return await this.account.createVerification(url);
    }catch(err){
        console.error("sendEmailVerification error: ", err.message);
        throw err;
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
        console.error("getCurrentUser: ",err.message)
        // throw err
        return null
    }
    
}

async logout(){
    try{
        await this.account.deleteSessions()
    }catch(err){
        console.error("logout: ",err.message)
    }
}

async passwordRecovery({email,url}){
    try{
        const recovery = await this.account.createRecovery(email,url)
        // if(recovery){
        //     return this.confirmRecovery({email})
        // }
        // return null
        return recovery;
        
    }catch(err){
        console.error("passwordRecovery Error: ",err.message)
    }
    
}

async confirmRecovery({userId, secret, password, passwordAgain}){
    try{
        const confirmRecovery = await this.account.updateRecovery(userId, secret, password, passwordAgain)

        return confirmRecovery
    }catch(err){
        console.error("confirmRecovery: ",err.message)
    }
}

// user dashboard methods
async updateName(name){
    try{
        return await this.account.updateName(name)
    }catch(err){
        console.error("updateName error: ",err.message)
        throw err
    }
}

async updateUserPhonenumber(phone, password){
    try{
        return await this.account.updatePhone(phone,password)
    }catch(err){
        console.error("updateUserPhonenumber: ",err.message)
        throw err
    }
}

async updateUserPassword(newPassword, oldPassword){
    try{
        return await this.account.updatePassword(newPassword, oldPassword)
    }catch(err){
        console.error("updateUserPassword: ",err.message)
        throw err
    }
}
// upi 
async updateUserUpi(upiId){
        try{
            const response = await this.account.updatePrefs({ upiId: upiId });
            return response;
        }catch(err){
            console.error("updateUserUpi error: ", err.message);
            console.log("error upi") // test 
            throw err;
        }
    }

    async getuserUpi(userId){
        try{
            const userAccount = await this.account.get();
            return userAccount.prefs?.upiId || null;
        }catch(err){
            console.error("getUserUpi error: ", err.message);
            return null;
        }
    }



}

const blogauthservice = new blogAuthService() // OBJECT CREATION: Class se object banane ke liye 'new' keyword zaroori hai.

// then use it like blogauthservice.

// then we need client and another is account


export default blogauthservice
