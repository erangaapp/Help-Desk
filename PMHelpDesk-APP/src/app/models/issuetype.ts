export class IssueType {

    id:number;
    code: string;
    description:string;

    constructor (id:number, code:string,description:string){
        this.id = id;
        this.code = code;
        this.description = description;
    }

}