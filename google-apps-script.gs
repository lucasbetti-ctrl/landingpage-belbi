// Cole este código em Extensões > Apps Script na sua planilha do Google Sheets.
// Depois publique como Web App (Implantar > Nova implantação > Aplicativo da Web),
// com acesso "Qualquer pessoa", e copie a URL gerada para usar no site.

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  const now = new Date();

  sheet.appendRow([
    data.name || '',
    data.company || '',
    data.email || '',
    data.phone || '',
    data.message || '',
    Utilities.formatDate(now, 'GMT-3', 'dd/MM/yyyy'),
    Utilities.formatDate(now, 'GMT-3', 'HH:mm:ss')
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
