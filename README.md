# Paperless-form-approval

## Setting up the project

1. To run this project you first need to make a copy of this Google Spreadsheet:
   https://docs.google.com/spreadsheets/d/1ZH_Am7wTxV7ovB9rvue1XTTRLQdakVNT7483CdI_OUo/edit?usp=sharing
   
   This spreadsheet also has a form called **Requests**.
2. In the copied spreadsheet, there is no Google Form. It only has a sheet of that form. To make a new form in it, go to **Tools** in the spreadsheet menu and select **Create a new form**. Now make a new form identical to **Requests**.
3. Change the first row in your form responses sheet to the first row of the **Requests** sheet.
4. Delete the **Requests** sheet and rename the response sheet as **Requests**.
5. Now go to **Extensions** -> **Apps Script**.
6. On the left sidebar, select **Triggers** create a new trigger which execution function **TriggerGoogleForm** and event type **On form Submit**. Save the trigger.
7. Go to option **Deploy** -> **New deployment**. Create a deployment with execute as **Me** and give access to all Google accounts.
8. Copy the web app URL and paste it in **DEPLOY_ID** of **macros.gs**
9. Create a folder in your drive with name **Paperless-Signatures** and upload signature files of all your approvers in **macros.gs** with file name as their Email Ids.
10. Go to your spreadsheet and go to **Tools** -> **Manage form** -> **Go to live form** to get your request form link.


## How to use
1. Fill the request form and upload any attachment (optional).
2. A pdf of your responses will be automatically generated and will be sent to the first approver via mail.
3. The approver can accept or reject the request and add some comment along.
4. If a request is accepted it is forwarded to next approver in chain till it reaches the last approver.
5. If a request is rejected the approval chain is terminated and request has to be initiated again.
6. You will receive updates at each level of approval when your request is accepted/rejected.

## Code
This is the link to github: https://github.com/DineshAvulaMohanaDurga/Paperless-form-approval.git
