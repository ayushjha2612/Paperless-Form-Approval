function SendEmail_(Requesteremail, ApproverEmail,  RequestContent, Attachment, Uuid, Last, state,comment) {
  Logger.log('reviewContent Requesteremail: ' + Requesteremail + ' RequestContent: ' + RequestContent + 'Attachment' + Attachment + ' Uuid: ' + Uuid + ' Last: ' + Last + " state: " + state);
  var scriptUri = DEPLOY_ID;
  Logger.log(scriptUri)
  var ApprovalUrl = scriptUri + "?i=" + Uuid + '&state=' + APPROVED_STATE + '&last=' + Last;
  var DenyUrl = scriptUri + "?i=" + Uuid + '&state=' + DENIED_STATE + '&last=' + Last;
  Logger.log(ApprovalUrl);
  Logger.log(DenyUrl);
  var form = {
    requester_Email: Requesteremail,
    requester_Content: RequestContent,
    approvers_Email: ApproverEmail,
    attachment: Attachment,
    uu_Id: Uuid,
    approval_Url: ApprovalUrl,
    deny_Url: DenyUrl,
    comment: comment
  };


  const ssId = SpreadsheetApp.getActiveSpreadsheet().getId()
  const templateSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PDFTEMPLATE);
  pdf = CreatePdf(form,templateSheet,ssId);
//The below 3 lines has no use except for unit testing of this function  
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('EMAILTESTING');
  var array = [ [Uuid] ];
  var newRange = sh.getRange(1,1,1,1);

  if (state === undefined ) {
    if(Attachment === ''){
      var templ = HtmlService.createTemplateFromFile('EmailReq');
    }
    else
    {
      var templ = HtmlService.createTemplateFromFile('EmailReqAttach');
    }
    
    templ.form = form;
    templ.uuid = Uuid;
    templ.actionURL =DEPLOY_ID;
    templ.state = APPROVED_STATE;
    templ.last = Last;

    // templ.uuid1 = Uuid;
    // templ.actionURL1 =DEPLOY_ID;
    // templ.state1 = APPROVED_STATE;
    // templ.last1 = Last;
    var message = templ.evaluate().getContent();
    MailApp.sendEmail({
      to: ApproverEmail,
      //cc: Session.getEffectiveUser().getEmail(),
      subject: "[Paperless] New approval request",
      htmlBody: message,
      attachments: [pdf]
    });
    //The below 2 lines has no use except for unit testing of this function  
    Logger.log(newRange.getA1Notation());
    newRange.setValues(array);
  }
  if (state === APPROVED_STATE) {
    var templ = HtmlService.createTemplateFromFile('EmailApprove');
    templ.form = form;
    var message = templ.evaluate().getContent();
    MailApp.sendEmail({
      to: Requesteremail,
      // cc: ApproverEmail,
      //bcc: Session.getEffectiveUser().getEmail(),
      subject: "[Paperless] Request Approved",
      htmlBody: message
    });
    //The below 2 lines has no use except for unit testing of this function  
    Logger.log(newRange.getA1Notation());
    newRange.setValues(array);
  }
  if (state === DENIED_STATE) {
    var templ = HtmlService.createTemplateFromFile('EmailReject');
    templ.form = form;
    var message = templ.evaluate().getContent();
    MailApp.sendEmail({
      to: Requesteremail,
      // cc: ApproverEmail,
      //bcc: Session.getEffectiveUser().getEmail(),
      subject: "[Paperless] Request Denied",
      htmlBody: message
    });
    //The below 2 lines has no use except for unit testing of this function  
    Logger.log(newRange.getA1Notation());
    newRange.setValues(array);
  }
}
