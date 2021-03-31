import { Module } from "./module";
import { Qualification } from "./qualification";

export class Course {
    public coursecode!:number;
    public coursename!:string;
    public description!:string;
    public duration!:number;
    public fees!:number;
    public qualifications:Qualification[]=[];
    public modules:Module[]=[];
    public active!:boolean;

    constructor(id:number){
        this.coursecode=id;
    }
}
