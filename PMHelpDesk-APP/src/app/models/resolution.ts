import { Staff } from './staff';
import { Issue } from './issue';

export class Resolution {

    id: number;
    issueId: number;
    staffId: number;
    description: string;

    staff: Staff;
    issue: Issue;

    constructor(id: number, issueId: number, staffId: number, description: string) {
        this.id = id;
        this.issueId = issueId;
        this.staffId = staffId;
        this.description = description;

    }

}

export class ResolutionRead {
    id: number;
    issueId: number;
    staffId: number;
    description: string;
    staff: string;
    issue: string;
}