//This function creates a pdf from the google form filled by user and returns the pdf 
function CreatePdf(form,templateSheet,ssId) {
  templateSheet.getRange('C11').setValue(form.requester_Email);
  templateSheet.getRange('C13').setValue(form.requester_Content);
  templateSheet.getRange('C15').setValue(form.attachment);
  SpreadsheetApp.flush();
  Utilities.sleep(500);
  const url = "https://docs.google.com/spreadsheets/d/" + ssId + "/export" +
    "?format=pdf&" +
    "gid=" + templateSheet.getSheetId();

  const params = { method: "GET", headers: { "authorization": "Bearer " + ScriptApp.getOAuthToken() } };
  const pdfBlob = UrlFetchApp.fetch(url, params).getBlob().setName(form.uu_Id + '.pdf');

  return pdfBlob;
}
