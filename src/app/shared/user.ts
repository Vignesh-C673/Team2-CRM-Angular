import { Roledetails } from './roledetails';

export class User {

    public user_id?:number;
    username!:string;
    password!:string;
    // role_id?:number;
    // role_Name!:string;
    public active!:boolean;
    public role!: Roledetails;
    public firstname!:string;
    public lastname!:string;
    public email!:string;
    public address!:string;
    public pincode!:number;
    public mobile!:number;
    
    // public dob!:Date;


}
