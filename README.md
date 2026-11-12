# Tarushi Healthcare – Website Feedback Portal

A responsive feedback questionnaire for PG MHM students reviewing https://www.tarushihealthcare.com/.

## Files
- `index.html` – complete responsive website and questionnaire.
- `Code.gs` – Google Apps Script endpoint that stores submissions in Google Sheets.

## 1. Create the response spreadsheet
1. Create a new Google Sheet named **Tarushi Healthcare – Website Feedback Responses**.
2. Open **Extensions → Apps Script**.
3. Replace the starter code with the contents of `Code.gs`.
4. Save the project.

The script automatically creates a tab named **Student Feedback** and adds the column headings on the first submission.

## 2. Deploy the Apps Script
1. In Apps Script, select **Deploy → New deployment**.
2. Select the gear icon / deployment type **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone** (this allows students to submit without signing in).
5. Select **Deploy** and complete Google's authorisation steps.
6. Copy the Web app URL. It should end in `/exec`.

Keep the Google Sheet private. Only share it with people who are authorised to review responses. The Apps Script web app URL is intended to be public so respondents can submit; do not share editor access to the Apps Script project or response Sheet.

## 3. Connect the form to Google Sheets
1. Open `index.html` in a text editor.
2. Find:
   `const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";`
3. Replace the placeholder with your deployed `/exec` URL, keeping the URL inside the quotation marks.
4. Save the file.

If you later change the Apps Script code, create a new deployment version or edit the existing deployment to point to the new version.

## 4. Publish using GitHub Pages
1. Sign in to GitHub and create a new **Public** repository, for example `tarushi-website-feedback`.
2. Upload `index.html` to the repository root. (You may also upload `Code.gs` and this README for your records; only `index.html` needs to be published.)
3. Open the repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then Save.
6. Wait for GitHub Pages to publish. Your student link will look like:
   `https://YOUR-GITHUB-USERNAME.github.io/tarushi-website-feedback/`
7. Open the published link on a phone and computer, submit a test response, and verify that a new row appears in the Google Sheet before sharing it with students.

## 5. Suggested message to students
Please review the Tarushi Healthcare website at https://www.tarushihealthcare.com/ and complete the feedback questionnaire at [PASTE YOUR GITHUB PAGES LINK]. Please provide honest, specific and constructive feedback. Your suggestions will be reviewed and considered for implementation.

## Important notes
- Name and email are optional in the form to encourage candid feedback.
- The 20 questionnaire items are required, including the six ratings under Question 19.
- The browser uses a `no-cors` submission because of the Google Apps Script web app cross-origin behaviour. The form displays a submission confirmation after the request is sent; verify the first test submission in the Sheet before distributing the link.
- This is a lightweight feedback collection form, not a secure login system. Do not collect sensitive or confidential personal information.
