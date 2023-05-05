function SendEmail_(
  formInput,
  Requesteremail,
  RequestContent,
  Attachment,
  Uuid,
  Last,
  Approver_num,
  state,
  comment
) {
  // Logger.log('reviewContent Requesteremail: ' + Requesteremail + ' RequestContent: ' + RequestContent + 'Attachment' + Attachment + ' Uuid: ' + Uuid + ' Last: ' + Last + " state: " + state);

  var scriptUri = DEPLOY_ID;
  Logger.log(state);
  Logger.log(scriptUri);
  // var ApprovalUrl = scriptUri + "?i=" + Uuid + '&state=' + APPROVED_STATE + '&last=' + Last+ '&aid=' + Approver_num ;
  // var DenyUrl = scriptUri + "?i=" + Uuid + '&state=' + DENIED_STATE + '&last=' + Last + '&aid=' + Approver_num ;
  // Logger.log(ApprovalUrl);
  // Logger.log(DenyUrl);
  if (Approver_num == 1) {
    var ApproverEmail = APPROVER1;
  } else if (Approver_num == 2) {
    var ApproverEmail = APPROVER2;
    var PrevApproverEmail = APPROVER1;
  } else {
    var ApproverEmail = APPROVER3;
    var PrevApproverEmail = APPROVER2;
  }

  var form = {
    requester_Email: Requesteremail,
    requester_Content: RequestContent,
    approvers_Email: ApproverEmail,
    prevapprovers_Email: PrevApproverEmail,
    attachment: Attachment,
    uu_Id: Uuid,
    // approval_Url: ApprovalUrl,
    // deny_Url: DenyUrl,
    comment: comment,
  };

  // The below 3 lines has no use except for unit testing of this function
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EMAILTESTING");
  var array = [[Uuid]];
  var newRange = sh.getRange(1, 1, 1, 1);

  // The below code manages the approval states
  if (state === undefined) {
    if (Attachment === "") {
      var templ = HtmlService.createTemplateFromFile("EmailReq");
    } else {
      var templ = HtmlService.createTemplateFromFile("EmailReqAttach");
    }

    templ.form = form;
    templ.uuid = Uuid;
    templ.actionURL = DEPLOY_ID;
    templ.state = APPROVED_STATE;
    templ.state1 = DENIED_STATE;
    templ.last = Last;
    templ.aid = Approver_num;

    // templ.uuid1 = Uuid;
    // templ.actionURL1 =DEPLOY_ID;
    // templ.state1 = APPROVED_STATE;
    // templ.last1 = Last;
    var message = templ.evaluate().getContent();
    pdf = CreatePdf(formInput, templateSheet, ssId, 0);
    MailApp.sendEmail({
      to: ApproverEmail,
      //cc: Session.getEffectiveUser().getEmail(),
      subject: "[Paperless] New approval request " + Approver_num,
      htmlBody: message,
      attachments: [pdf],
    });
    //The below 2 lines has no use except for unit testing of this function
    Logger.log(newRange.getA1Notation());
    newRange.setValues(array);
  }
  if (state === APPROVED_STATE) {
    Logger.log("I am in approved state");
    pdf = CreatePdf(formInput, templateSheet, ssId, Approver_num - 1);
    if (Approver_num == NUM_APPROVERS + 1) {
      var templ = HtmlService.createTemplateFromFile("EmailApprove");
      templ.form = form;
      var message = templ.evaluate().getContent();
      MailApp.sendEmail({
        to: Requesteremail,
        // cc: ApproverEmail,
        //bcc: Session.getEffectiveUser().getEmail(),
        subject: "[Paperless] Request Approved by Everyone",
        htmlBody: message,
        attachments: [pdf],
      });
    } else {
      if (Attachment === "") {
        var temp2 = HtmlService.createTemplateFromFile("EmailReq");
      } else {
        var temp2 = HtmlService.createTemplateFromFile("EmailReqAttach");
      }

      temp2.form = form;
      temp2.uuid = Uuid;
      temp2.actionURL = DEPLOY_ID;
      temp2.state = APPROVED_STATE;
      temp2.state1 = DENIED_STATE;
      temp2.last = Last;
      temp2.aid = Approver_num;

      // templ.uuid1 = Uuid;
      // templ.actionURL1 =DEPLOY_ID;
      // templ.state1 = APPROVED_STATE;
      // templ.last1 = Last;
      var message = temp2.evaluate().getContent();
      MailApp.sendEmail({
        to: ApproverEmail,
        //cc: Session.getEffectiveUser().getEmail(),
        subject: "[Paperless] New approval request " + Approver_num,
        htmlBody: message,
        attachments: [pdf],
      });

      var temp1 = HtmlService.createTemplateFromFile("EmailApprove");
      temp1.form = form;
      var message = temp1.evaluate().getContent();
      MailApp.sendEmail({
        to: Requesteremail,
        // cc: ApproverEmail,
        //bcc: Session.getEffectiveUser().getEmail(),
        subject: "[Paperless] Request Approved",
        htmlBody: message,
      });
    }
  }
  if (state === DENIED_STATE) {
    var templ = HtmlService.createTemplateFromFile("EmailReject");
    templ.form = form;
    var message = templ.evaluate().getContent();
    MailApp.sendEmail({
      to: Requesteremail,
      // cc: ApproverEmail,
      //bcc: Session.getEffectiveUser().getEmail(),
      subject: "[Paperless] Request Denied",
      htmlBody: message,
    });
  }
}
