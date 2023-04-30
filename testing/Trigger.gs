function TriggerGoogleForm(formEvent) {
var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REQUESTS);
var lastrow = sh.getLastRow();
var lastcol = sh.getLastColumn();
var Requesteremail = formEvent.values[1];
var ApproverEmail = formEvent.values[2];
var RequestContent = formEvent.values[3];
var Attachment = formEvent.values[4];
// Generate Unique ID
var Uuid = uuid_();
if(Attachment != ''){
  fileId = Attachment.split('id=')[1];
  Drive.Permissions.insert({
    'value': ApproverEmail,
    'type': "user",
    'role': "reader",
    'withLink': false
  },
  fileId,
  {
    'sendNotificationEmails': false
  });
}
// var file= DriveApp.getFileById(RequestContent);
// file.addViewer(ApproverEmail);
var scriptUri = DEPLOY_ID;
Logger.log('uri: '+scriptUri);
// Append results in the Google Sheet
var array = [ [Uuid, "NA", "NA" ] ]
Logger.log('array to be inserted in the Sheet lastrow: '+array);
var newRange = sh.getRange(lastrow,lastcol-2,1,3);
Logger.log(newRange.getA1Notation());
newRange.setValues(array);
SendEmail_(
  Requesteremail,
  ApproverEmail,
  RequestContent,
  Attachment,
  Uuid,
  lastrow
  ); 
}
