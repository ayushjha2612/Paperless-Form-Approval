function doGet(request) {
  var user = Session.getActiveUser().getEmail();
  var last = (request.parameters.last);
  var comment = (request.parameters.comment)+"";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REQUESTS);
  var lastcol = sheet.getLastColumn();
  var rangeApprove = sheet.getRange(last, lastcol-1, 1, 1).getValue();
  var rangeDeny = sheet.getRange(last, lastcol, 1, 1).getValue();
  if(rangeApprove=="NA" && rangeDeny=="NA"){
    if (request.parameters.state == APPROVED_STATE) {
      var id = (request.parameters.i)+"";
      var last = (request.parameters.last);
      Logger.log(request.parameters.i);
      Logger.log(request.parameters.state);
      Logger.log(request.parameters.last);
      writeData_(id, APPROVED_STATE, last,comment);
    }
    if (request.parameters.state == DENIED_STATE) {
      var id = (request.parameters.i)+"";
      var last = (request.parameters.last);   
      Logger.log(request.parameters.i);
      Logger.log(request.parameters.state);
      Logger.log(request.parameters.last);
      writeData_(id, DENIED_STATE, last,comment);
    }
    return ContentService.createTextOutput('Thank you for using Paperless. Your response has been recorded.');
  }
  else
  {
    return ContentService.createTextOutput('Thank you for using Paperless. But the request has already been responded.');
  }
}
function writeData_(i, state, last,comment) {
  var logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LOG_SHEET);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REQUESTS);
  var dateForLogging = new Date().toLocaleString();
  
  var emailsession = Session.getActiveUser().getEmail();
  var dataRange = sheet.getRange(last, 1, 1, sheet.getLastColumn());
  var dataValues = dataRange.getValues();

  var RequesterEmail = dataValues[0][1];
  var ApproverEmail = dataValues[0][2];
  var RequestContent = dataValues[0][3];
  var Attachment = dataValues[0][4];

  // Logger.log('dataRange: ' + dataRange.getA1Notation());
  
  logSheet.appendRow([dateForLogging, RequesterEmail, emailsession, RequestContent, i, state,comment]);

  var lastcol = sheet.getLastColumn();
  Logger.log(dataValues);
  if (state === APPROVED_STATE) {
    var rangeApprove = sheet.getRange(last, lastcol-1, 1, 1);
    Logger.log('rangeApprove: ' + rangeApprove.getA1Notation());
    rangeApprove.setValues([
      [emailsession + ' on: ' + dateForLogging]
    ]);
  }
  if (state === DENIED_STATE) {
    var rangeDeny = sheet.getRange(last, lastcol, 1, 1);
    Logger.log('rangeDeny: ' + rangeDeny.getA1Notation());
    rangeDeny.setValues([
      [emailsession + ' on: ' + dateForLogging]
    ]);
  }
  //SendEmail_(Requesteremail, RequestContent, Uuid, Last, state)
  SendEmail_(RequesterEmail, ApproverEmail,RequestContent, Attachment, i, last, state,comment);
}


function doGet1(request) {
  var user = Session.getActiveUser().getEmail();
  var last = (request.parameters.last);
  var comment = (request.parameters.comment)+"";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REQUESTS);
  var lastcol = sheet.getLastColumn();
  var rangeApprove = sheet.getRange(last, lastcol-1, 1, 1).getValue();
  var rangeDeny = sheet.getRange(last, lastcol, 1, 1).getValue();
  if(rangeApprove=="NA" && rangeDeny=="NA"){
    if (request.parameters.state == APPROVED_STATE) {
      var id = (request.parameters.i)+"";
      var last = (request.parameters.last);
      Logger.log(request.parameters.i);
      Logger.log(request.parameters.state);
      Logger.log(request.parameters.last);
      writeData_(id, APPROVED_STATE, last,comment);
    }
    if (request.parameters.state == DENIED_STATE) {
      var id = (request.parameters.i)+"";
      var last = (request.parameters.last);   
      Logger.log(request.parameters.i);
      Logger.log(request.parameters.state);
      Logger.log(request.parameters.last);
      writeData_(id, DENIED_STATE, last,comment);
    }
    return ContentService.createTextOutput('Thank you for using Paperless. Your response has been recorded.');
  }
  else
  {
    return ContentService.createTextOutput('Thank you for using Paperless. But the request has already been responded.');
  }
}