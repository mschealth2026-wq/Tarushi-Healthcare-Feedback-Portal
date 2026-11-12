/**
 * Tarushi Healthcare – Student Website Feedback
 * Google Apps Script endpoint for the GitHub Pages feedback form.
 *
 * Setup:
 * 1. Create a Google Sheet for responses.
 * 2. In the Sheet, open Extensions > Apps Script.
 * 3. Replace the editor contents with this file and save.
 * 4. Deploy > New deployment > Web app.
 * 5. Execute as: Me. Who has access: Anyone.
 * 6. Copy the Web app URL into GOOGLE_SCRIPT_URL in index.html.
 */

const SHEET_NAME = "Student Feedback";

const HEADERS = [
  "Submitted At", "Student Name", "Student Email", "Institution / Programme",
  "Q1 First impression", "Q2 Clarity of purpose", "Q3 Brand positioning", "Q4 Target audience",
  "Q5 Service categories", "Q6 Most relevant service category", "Q7 Service clarity", "Q8 Missing services",
  "Q9 Professional credibility", "Q10 Deliverables", "Q11 Navigation", "Q12 Content quality",
  "Q13 Visual presentation", "Q14 About Us credibility", "Q15 Trust and credibility",
  "Q16 100-bed hospital client perspective", "Q17 Call to action", "Q18 Competitive positioning",
  "Q19 Professional appearance", "Q19 Clarity of services", "Q19 Healthcare management relevance",
  "Q19 Ease of navigation", "Q19 Credibility and trust", "Q19 Overall effectiveness",
  "Q20 Top three recommendations"
];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Basic honeypot spam check.
    if (data.website) return output({ ok: true });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    const r = data.responses || {};
    const q19 = r.Q19 || {};
    const row = [
      new Date(),
      clean(data.studentName),
      clean(data.studentEmail),
      clean(data.institution),
      clean(r.Q1), clean(r.Q2), clean(r.Q3), clean(r.Q4),
      clean(r.Q5), clean(r.Q6), clean(r.Q7), clean(r.Q8),
      clean(r.Q9), clean(r.Q10), clean(r.Q11), clean(r.Q12),
      clean(r.Q13), clean(r.Q14), clean(r.Q15), clean(r.Q16),
      clean(r.Q17), clean(r.Q18),
      clean(q19["Professional appearance"]),
      clean(q19["Clarity of services"]),
      clean(q19["Relevance to healthcare management"]),
      clean(q19["Ease of navigation"]),
      clean(q19["Credibility and trust"]),
      clean(q19["Overall effectiveness"]),
      clean(r.Q20)
    ];

    // Prevent formula injection in text fields.
    sheet.appendRow(row.map(value => typeof value === "string" && /^[=+\-@]/.test(value) ? "'" + value : value));
    return output({ ok: true });
  } catch (err) {
    console.error(err);
    return output({ ok: false, error: String(err) });
  }
}

function doGet() {
  return output({ service: "Tarushi Healthcare feedback endpoint", status: "ready" });
}

function clean(value) {
  return String(value == null ? "" : value).slice(0, 5000);
}

function output(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
