function TriggerGoogleForm(formEvent) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REQUESTS);
  var lastrow = sh.getLastRow();
  var lastcol = sh.getLastColumn();
  var Requesteremail = formEvent.values[1];
  var Name = formEvent.values[4];
  var RollNum = formEvent.values[5];
  var RequestContent = formEvent.values[2];
  var Attachment = formEvent.values[3];
  Logger.log(Attachment);

  var formInput = {
    name: Name,
    rollNum: RollNum,
    requesterEmail: Requesteremail,
    requestContent: RequestContent,
    attachment: Attachment,
  };

  // Generate Unique ID
  var Uuid = uuid_();
  if (Attachment != "") {
    fileId = Attachment.split("id=")[1];
    Drive.Permissions.insert(
      {
        value: [APPROVER1, APPROVER2, APPROVER3],
        type: "user",
        role: "reader",
        withLink: false,
      },
      fileId,
      {
        sendNotificationEmails: false,
      }
    );
  }

  var scriptUri = DEPLOY_ID;
  Logger.log("uri: " + scriptUri);
  // Append results in the Google Sheet
  var array = [[Uuid, "NA", "NA", "NA", "NA", "NA", "NA"]];
  Logger.log("array to be inserted in the Sheet lastrow: " + array);
  var newRange = sh.getRange(
    lastrow,
    lastcol - NUM_APPROVERS * 2,
    1,
    NUM_APPROVERS * 2 + 1
  );
  Logger.log(newRange.getA1Notation());
  newRange.setValues(array);
  SendEmail_(
    formInput,
    Requesteremail,
    RequestContent,
    Attachment,
    Uuid,
    lastrow,
    1
  );
}
