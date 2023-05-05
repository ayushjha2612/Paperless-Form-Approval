//This function creates a pdf from the formInput and returns it
function CreatePdf(formInput, templateSheet, ssId, approverNum) {
  fillTemplate(formInput, approverNum);
  SpreadsheetApp.flush();
  const url =
    "https://docs.google.com/spreadsheets/d/" +
    ssId +
    "/export" +
    "?format=pdf&" +
    "gid=" +
    templateSheet.getSheetId();

  const params = {
    method: "GET",
    headers: { authorization: "Bearer " + ScriptApp.getOAuthToken() },
  };
  const pdfBlob = UrlFetchApp.fetch(url, params)
    .getBlob()
    .setName("ApprovalForm.pdf");

  return pdfBlob;
}

//This Function populates the template Sheet
function fillTemplate(formInput, approverNum) {
  // First clear all the ranges
  nameRange.clearContent();
  rollNumRange.clearContent();
  requesterEmailRange.clearContent();
  requestContentRange.clearContent();
  attachmentRange.clearContent();

  // Clear all the three signatures
  approver_1SignRange.clear();
  approver_2SignRange.clear();
  approver_3SignRange.clear();

  // Fill the values in template
  nameRange.setValue(formInput.name);
  rollNumRange.setValue(formInput.rollNum);
  requesterEmailRange.setValue(formInput.requesterEmail);
  requestContentRange.setValue(formInput.requestContent);
  attachmentRange.setValue(formInput.attachment);

  // Get the signature done
  approver_1Sign = getSignature(APPROVER1);
  approver_2Sign = getSignature(APPROVER2);
  approver_3Sign = getSignature(APPROVER3);

  if (approverNum == 1) {
    templateSheet.insertImage(approver_1Sign, 7, 23);
    SpreadsheetApp.flush();
  } else if (approverNum == 2) {
    templateSheet.insertImage(approver_1Sign, 7, 23);
    templateSheet.insertImage(approver_2Sign, 2, 27);
    SpreadsheetApp.flush();
  } else if (approverNum == 3) {
    templateSheet.insertImage(approver_1Sign, 7, 23);
    templateSheet.insertImage(approver_2Sign, 2, 27);
    templateSheet.insertImage(approver_3Sign, 7, 31);
    SpreadsheetApp.flush();
  }
}
