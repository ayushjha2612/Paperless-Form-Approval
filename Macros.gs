var ssId = SpreadsheetApp.getActiveSpreadsheet().getId();
var templateSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PdfTemplate');
var appSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Approvers Details');

var APPROVER1 = 'cs20btech11057@iith.ac.in';
var APPROVER2 = 'mvp@cse.iith.ac.in';
var APPROVER3 = 'cs21resch11004@iith.ac.in';

var NUM_APPROVERS = parseInt('3');

var APPROVED_STATE = "APPROVED";
var DENIED_STATE = "DENIED";
var LOG_SHEET = 'Logs';
var REQUESTS = 'Requests'
var PDFTEMPLATE = 'PdfTemplate';
var DEPLOY_ID = "https://script.google.com/macros/s/AKfycbznCNEzA_A3UJDdRDwT9coW69Bohi8nn1eUiauCspQ/dev";

