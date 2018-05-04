import { Issue } from './issue';

export class IssueRelationship {

    id: number;
    issueId: number;
    relatedIssueId: number;
    dateRelated: Date;
    
    constructor(id: number, issueId: number, relatedIssueId: number, dateRelated: Date) {
        this.id = id;
        this.issueId = issueId;
        this.relatedIssueId = relatedIssueId;
        this.dateRelated = dateRelated;
    }

}

export class IssueRelationshipRead {
    id: number;
    issueId: number;
    relatedIssueId: number;
    dateRelated: Date;
    issue: string;
    relatedIssue: string;
}

