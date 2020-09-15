import {Component, OnInit} from '@angular/core';
import {faEdit, faPlus, faRocket, faTrash, faUser} from '@fortawesome/free-solid-svg-icons';

export interface CaseModel {
  caseID: number;
  subject: string;
  category: string;
  description: string;
  relatedIDs: string;
  requestor: string;
  status: number;
  comment: string;
}

const ALL_CASES: CaseModel[] = [
  {caseID: 1, category: 'Legal', subject: 'accident', description: 'more about the accident', relatedIDs: '', requestor: 'Sara Borghei', status: 0, comment: 'No Coment'},
  {caseID: 2, category: 'Medical', subject: 'surgery', description: 'more about the accident', relatedIDs: '1', requestor: 'Farbod Sedghi', status: 0, comment: 'No Coment'},
  {caseID: 3, category: 'Other', subject: 'child support', description: 'more about the accident', relatedIDs: '2', requestor: 'Sara Borghei', status: 1, comment: 'No Coment'},
  {caseID: 4, category: 'Legal', subject: 'Law suit', description: 'more about the accident', relatedIDs: '', requestor: 'Vista Sedghi', status: 1, comment: 'No Coment'},
  {caseID: 5, category: 'Other', subject: 'school supply', description: 'more about the accident', relatedIDs: '2', requestor: 'Sara Borghei', status: 0, comment: 'No Coment'},
  {caseID: 6, category: 'Legal', subject: 'accident', description: 'more about the accident', relatedIDs: '', requestor: 'Sara Borghei', status: 2, comment: 'No Coment'},
  {caseID: 7, category: 'Legal', subject: 'accident', description: 'more about the accident', relatedIDs: '5', requestor: 'Sara Borghei', status: 2, comment: 'No Coment'},
  {caseID: 8, category: 'Legal', subject: 'accident', description: 'more about the accident', relatedIDs: '', requestor: 'Samira Borghei', status: 0, comment: 'No Coment'},
  {caseID: 9, category: 'Medical', subject: 'dental', description: 'more about the accident', relatedIDs: '2', requestor: 'Farbod Sedghi', status: 1, comment: 'No Coment'},
  {caseID: 10, category: 'Legal', subject: 'accident', description: 'more about the accident', relatedIDs: '6', requestor: 'Samira Borghei', status: 2, comment: 'No Coment'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CM App';
  faUser = faUser;
  faLaunch = faRocket;
  faTrash = faTrash;
  faPlus = faPlus;
  faEdit = faEdit;
  loggedinUser = 'Sara Borghei';
  displayedColumns: string[] = ['caseID', 'requestor', 'category', 'subject', 'relatedIDs', 'status', 'comment', 'action'];
  allcases = ALL_CASES;
  displayedCases = ALL_CASES;
  filter = 'All';
  edit = 'New';
  home = true;
  categories = [];
  user = {fname: 'Sara', lname: 'Borghei', email: 'sara.borghei@gmail.com'};
  model = {caseID: 0, subject: '', category: '', description: '', relatedIDs: '', requestor: '', status: 0, comment: ''};

  ngOnInit() {
  }

  getMyCases() {
    const user = this.loggedinUser;
    if (this.filter === 'All') {
      // tslint:disable-next-line:only-arrow-functions
      const mycases = this.allcases.filter(function(element) {
        return element.requestor === user;
      });
      this.displayedCases = mycases;
      this.filter = 'My';
    } else {
      this.refreshAllCases();
    }
  }

  resetUser() {
    this.user = {fname: 'Sara', lname: 'Borghei', email: 'sara.borghei@gmail.com'};
  }

  resetModel() {
    this.model = {caseID: 0, subject: '', category: '', description: '', relatedIDs: '', requestor: '', status: 0, comment: ''};
  }

  refreshAllCases() {
    this.filter = 'All';
    this.displayedCases = this.allcases;
  }

  removeCase(caseId: number) {
    // tslint:disable-next-line:only-arrow-functions
    const filteredCases = this.allcases.filter(function(element) {
      return element.caseID !== caseId;
    });
    this.allcases = filteredCases;
    this.displayedCases = filteredCases;
    console.log('Case has been removed: case ' + caseId);
  }

  editCase(caseId: number) {
    this.home = false;
    this.edit = 'Edit';
    const editedCase = this.allcases.filter(element => element.caseID === caseId);
    this.model = editedCase[0];
    this.user.fname = editedCase[0].requestor.split(' ')[0];
    this.user.lname = editedCase[0].requestor.split(' ')[1];
    this.user.email = '';
  }

  getValues(key: string) {
    let values = [];
    this.allcases.forEach(item => values.indexOf(item[key]) === -1 ? values.push(item[key]) : console.log('Skipped'));
    return values;
  }

  addCase() {
    this.categories = this.getValues('category');
    this.home = false;

  }

  createNewCase() {
    const caseId = this.allcases.length + 1;
    const user = this.user.fname + ' ' + this.user.lname;
    const newCase: CaseModel = {
      caseID: caseId,
      requestor: user,
      subject: this.model.subject,
      description: this.model.description,
      category: this.model.category,
      relatedIDs: this.model.relatedIDs,
      status: 0,
      comment: 'None'
    };
    this.allcases.push(newCase);
    this.refreshAllCases();
    this.resetModel();
    this.home = true;
  }

  cancel(action: string) {
    this.refreshAllCases();
    this.resetModel();
    this.resetUser();
    if (action === 'cancel') {
      this.home = true;
    }
  }
}
