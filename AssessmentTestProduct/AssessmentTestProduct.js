import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';

const PAGE_SIZE_OPTIONS = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 }
];

const columnList = [
    { label: 'Product Name', fieldName: 'Name', type: 'text' },
    { label: 'Product Code', fieldName: 'ProductCode', type: 'text'},
    { label: 'Active', fieldName: 'IsActive', type: 'Checkbox' },
    { label: 'Product Description', fieldName: 'Description', type: 'Text Area'}
];

export default class AssessmentTestProduct extends LightningElement {
    
    pageSizeOptions = PAGE_SIZE_OPTIONS;
    columns = columnList;
    
    // disablePreviousButton = true;
    // disableNextButton = true;
    // disableFirstButton = true;
    // disableLastButton = true;

    // previousButtonClass = 'slds-button_neutral slds-not-selected';
    // nextButtonClass = 'slds-button_neutral slds-not-selected';
    // firstButtonClass = 'slds-button_neutral slds-not-selected';
    // lastButtonClass = 'slds-button_neutral slds-not-selected';

    pageSize = '5'; //initialized default records per page
    pageNumber = 1;
    totalRecords = 0;
    totalPages = 0;
    products = [];

    @wire(getProducts, { pageNumber: '$pageNumber', pageSize: '$pageSize' })
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data.products;
            this.totalRecords = data.totalRecords;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            // this.disablePreviousButton = this.pageNumber === 1;
            // this.disableNextButton = data.length < this.pageSize;
            // this.disableFirstButton = this.pageNumber === 1;
            // this.disableLastButton = data.length < this.pageSize;
        } else if (error) {
            console.error(error);
        }
    }

    handleFirst() {
        this.pageNumber = 1;
    }

    handlePrevious() {
        if (this.pageNumber > 1) {
            this.pageNumber--;
        }
    }

    handleNext() {
        if (this.pageNumber < this.totalPages) {
            this.pageNumber++;
        }
    }

    handleLast() {
        this.pageNumber = this.totalPages;
    }

    handlePageSizeChange(event) {
        this.pageSize = event.target.value;
        this.pageNumber = 1;
    }

    // get previousButtonClass() {
    //     return `slds-button_neutral ${this.disablePreviousButton ? 'slds-not-selected' : ''}`;
    // }

    // get nextButtonClass() {
    //     return `slds-button_neutral ${this.disableNextButton ? 'slds-not-selected' : ''}`;
    // }

    // get firstButtonClass() {
    //     return `slds-button_neutral ${this.disableFirstButton ? 'slds-not-selected' : ''}`;
    // }

    // get lastButtonClass() {
    //     return `slds-button_neutral ${this.disableLastButton ? 'slds-not-selected' : ''}`;
    // }

}