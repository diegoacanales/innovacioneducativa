// ============================================================
// CADi - Innovacion Educativa I
// Apps Script: recibe evidencias desde el sitio estatico
// y las guarda en Google Drive.
//
// SETUP:
//   1. Reemplaza DRIVE_FOLDER_ID_HERE con el ID de la carpeta
//      de destino en Google Drive.
//   2. Despliega como aplicacion web:
//        Implementar > Nueva implementacion > Aplicacion web
//        Ejecutar como: Yo
//        Quienes tienen acceso: Cualquier usuario
//   3. Copia la URL de implementacion y pegala en index.html
//      donde dice APPS_SCRIPT_URL_HERE.
// ============================================================

var DRIVE_FOLDER_ID = 'DRIVE_FOLDER_ID_HERE';

/**
 * Handles GET requests - returns a simple health-check page.
 * Useful to verify the script is deployed correctly.
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'CADi upload endpoint activo.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles POST requests from the static site.
 *
 * Expected parameters (application/x-www-form-urlencoded):
 *   nombre       - Nombre completo del participante
 *   correo       - Correo electronico
 *   file1_name   - Nombre del archivo 1
 *   file1_data   - Contenido del archivo 1 en base64
 *   ...up to...
 *   file5_name   - Nombre del archivo 5 (opcional)
 *   file5_data   - Contenido del archivo 5 en base64 (opcional)
 */
function doPost(e) {
  try {
    var params = e.parameter;

    var nombre = (params.nombre || '').trim();
    var correo = (params.correo || '').trim();

    if (!nombre || !correo) {
      return jsonResponse({ ok: false, error: 'nombre y correo son requeridos.' });
    }

    // Get or create root destination folder
    var rootFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

    // Create a subfolder named "[Nombre] - [correo]"
    // (using a regular dash per project style guide)
    var subfolderName = nombre + ' - ' + correo;
    var subfolder = rootFolder.createFolder(subfolderName);

    // Save each file
    var savedCount = 0;
    for (var i = 1; i <= 5; i++) {
      var nameKey = 'file' + i + '_name';
      var dataKey = 'file' + i + '_data';

      var fileName = params[nameKey];
      var fileData = params[dataKey];

      if (!fileName || !fileData) continue;

      // Decode base64 to bytes
      var decodedBytes = Utilities.base64Decode(fileData);
      var blob = Utilities.newBlob(decodedBytes, detectMimeType(fileName), fileName);
      subfolder.createFile(blob);
      savedCount++;
    }

    // Log the submission for auditing purposes
    logSubmission(nombre, correo, savedCount, subfolder.getUrl());

    return jsonResponse({ ok: true, saved: savedCount, folder: subfolder.getUrl() });

  } catch (err) {
    Logger.log('doPost error: ' + err.toString());
    return jsonResponse({ ok: false, error: err.toString() });
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns a JSON ContentService response with CORS headers.
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Infers a MIME type from the file extension.
 * Falls back to application/octet-stream for unknown types.
 */
function detectMimeType(fileName) {
  var ext = (fileName.split('.').pop() || '').toLowerCase();
  var types = {
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'doc':  'application/msword',
    'pdf':  'application/pdf',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'xls':  'application/vnd.ms-excel',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'png':  'image/png',
    'jpg':  'image/jpeg',
    'jpeg': 'image/jpeg',
  };
  return types[ext] || 'application/octet-stream';
}

/**
 * Appends a row to a log sheet named "Entregas" in the same
 * spreadsheet bound to this script (if one exists).
 * If the script is standalone (not bound), this is silently skipped.
 */
function logSubmission(nombre, correo, fileCount, folderUrl) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return;

    var sheet = ss.getSheetByName('Entregas');
    if (!sheet) {
      sheet = ss.insertSheet('Entregas');
      sheet.appendRow(['Timestamp', 'Nombre', 'Correo', 'Archivos guardados', 'Carpeta en Drive']);
    }
    sheet.appendRow([new Date(), nombre, correo, fileCount, folderUrl]);
  } catch (ignore) {
    // Standalone script - no spreadsheet available, skip logging
  }
}
