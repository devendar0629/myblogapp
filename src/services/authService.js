import { Client, Account } from 'appwrite'
import config from '../config/config'

export class AuthService {

    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        console.log(config.appwriteUrl)

        this.account = new Account(this.client);
    }

    // <----------------- ACCOUNT SERVICES ------------------>

    async createAccount({ userId, email, password, name, bio='' }){
        try {
            return await this.account.create(
                userId,
                email,
                password,
                name
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async login({ email, password}){
        try {
            return await this.account.createEmailSession(
                email,
                password
            )
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async getAllSessions(){
        try {
            return await this.account.listSessions()
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async logoutEverywhere(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    // <---------------- UPDATE SERVICES ----------------->

    async updatePreferences(preferences){
        try {
            return await this.account.updatePrefs(preferences);
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async updateEmail({ email, password }){
        try {
            return await this.account.updateEmail(
                email,
                password
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async updatePassword({ newPassword, oldPassword }){
        try {
            return await this.account.updatePassword(
                newPassword,
                oldPassword
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }

    async updateName(newName){
        try {
            return await this.account.updateName(
                newName
            )
        } catch (error) {
            console.log(`${error.code} : ${error.message}`);
        }
    }
}

const authService = new AuthService()
export default authService