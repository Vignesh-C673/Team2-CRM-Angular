import { Course } from "./course";
import { Status } from "./status";

export class Enquiry {
	public enqid!: number;
	public enqName!: string;
	public dob!: Date;
	public email!: string;
	public mobile!: number;
	public address!: string;
	public highestQual!: string;
	public percent!: number;
	public yearOfPass!: number;
	public enqDate!: Date;
	public status!: Status ;
	public enquiredCourse: Course[] = [];
}
