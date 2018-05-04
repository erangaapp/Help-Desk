export class Staff {

    id:number;
    name: string;
    phone?:string;
    email?:string;
    address?:string;

    constructor (id:number, name:string,email?:string,phone?:string,address?:string){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }

}