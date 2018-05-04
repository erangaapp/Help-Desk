import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const users = [
      { id: 1, firstName: 'Nice', lastName: 'Marko', email: 'nice@mail.com', phone: '+6155343456', address: 'Western' },
      { id: 2, firstName: 'Narco', lastName: 'Nice', email: 'narco@mail.com', phone: '+6122343456', address: 'Eastern' },
      { id: 3, firstName: 'Bombasto', lastName: 'Celeritas', email: 'bombasto@mail.com', phone: '+6198343456', address: 'Middle' }
    ];

    const issuetypes = [
      { id: 1, code: 'Inc', description: 'Incident' },
      { id: 2, code: 'Pro', description: 'Problem' },
      { id: 3, code: 'Cha', description: 'Change' }
    ];

    const staffs = [
      { id: 1, name: 'Michel Knight', email: 'michel@mail.com', phone: '+6177553443', address: 'Western' },
      { id: 2, name: 'Steve Nicol', email: 'steve@mail.com', phone: '+6198787887', address: 'South East' },
      { id: 3, name: 'Mark Thuraga', email: 'mark@mail.com', phone: '+6155434332', address: 'South Central' }
    ];

    const issues = [
      { id: 1, issueTypeId: 1, userId: 1, dateReported: new Date(), description: 'Wifi network does not detected', dateResolved: null },
      { id: 2, issueTypeId: 1, userId: 1, dateReported: new Date(), description: 'Router replacement required', dateResolved: null }
    ];

    const issuerelationships = [
      { id: 1, issueId: 1, relatedIssueId: 2, dateRelated: new Date() }
    ];

    const resolutions = [
        {id:1, issueId: 1,staffId: 1,description: 'Resolution 1'}
    ];

    return { users, issuetypes, staffs, issues, issuerelationships, resolutions };

  }
}
