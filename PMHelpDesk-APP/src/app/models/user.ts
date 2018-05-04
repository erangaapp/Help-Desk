export class User {

    id: number;
    firstName: string;
    lastName:string;
    phone?:string;
    email?:string;
    address?:string;

    constructor (id:number,firstName:string,lastName:string,email?:string,phone?:string,address?:string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }

}