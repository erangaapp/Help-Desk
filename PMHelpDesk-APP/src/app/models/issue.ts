import { User } from './user';
import { IssueType } from './issuetype';

export class Issue {

    id: number;
    issueTypeId: number;
    userId: number;
    dateReported: Date;
    description: string;
    dateResolved?: Date;

    user: User;
    issueType: IssueType;

    constructor(id: number, issueTypeId: number, userId: number, dateReported: Date, description: string, dateResolved?: Date) {
        this.id = id;
        this.issueTypeId = issueTypeId;
        this.userId = userId;
        this.dateReported = dateReported;
        this.description = description;
        this.dateResolved = dateResolved;

    }

}

export class IssueRead {
    id: number;
    issueTypeId: number;
    userId: number;
    dateReported: Date;
    description: string;
    dateResolved?: Date;
    user: string;
    issueType: string;
}

