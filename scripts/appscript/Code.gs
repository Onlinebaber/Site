function doGet() {
  return ContentService.createTextOutput('Booking endpoint is ready.').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  let payload = {};
  if (e && e.postData && e.postData.type === 'application/json') {
    payload = JSON.parse(e.postData.contents || '{}');
  } else if (e && e.parameter) {
    payload = e.parameter;
  }

  const eventId = bookAppointment(payload);
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', eventId: eventId }))
    .setMimeType(ContentService.MimeType.JSON);
}

function bookAppointment(data) {
  const props = PropertiesService.getScriptProperties();
  const SHEET_ID = props.getProperty('SHEET_ID') || '1MqW73MzPZzu_digcdUlcvjARRZMQIqZMwmNDz94fxj0';
  const CALENDAR_ID = props.getProperty('CALENDAR_ID') || 'onlinebarberza@gmail.com';

  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName('Bookings');
  if (!sheet) {
    sheet = ss.insertSheet('Bookings');
    sheet.appendRow(['CreatedAt', 'Name', 'Email', 'Phone', 'Start', 'End', 'Service', 'Notes', 'EventId']);
  }

  let start = data.start ? new Date(data.start) : new Date();
  if (!data.start && (data.date || data.slot || data.time)) {
    const dateValue = data.date || data.bookingDate || '';
    const timeValue = data.slot || data.time || data.startTime || '09:00';
    const parsedDate = new Date(dateValue);
    if (!isNaN(parsedDate.getTime())) {
      const [hours, minutes] = timeValue.split(':').map(Number);
      start = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate(), hours || 9, minutes || 0);
    }
  }
  const durationMinutes = Number(data.durationMinutes || 60);
  const end = data.end ? new Date(data.end) : new Date(start.getTime() + durationMinutes * 60 * 1000);

  const row = [
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    start.toISOString(),
    end.toISOString(),
    data.service || data.serviceLabel || '',
    data.notes || '',
    ''
  ];
  sheet.appendRow(row);

  const cal = CalendarApp.getCalendarById(CALENDAR_ID);
  const title = data.service ? (data.service + ' — ' + (data.name || '')) : ('Booking — ' + (data.name || ''));
  const event = cal.createEvent(title, start, end, {
    description: data.notes || '',
    guests: data.email ? [data.email] : []
  });

  const eventId = event.getId();
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 9).setValue(eventId);
  return eventId;
}

function setupScriptProperties() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty('SHEET_ID', '1MqW73MzPZzu_digcdUlcvjARRZMQIqZMwmNDz94fxj0');
  props.setProperty('CALENDAR_ID', 'onlinebarberza@gmail.com');
}

function setupSpreadsheetHeaders_manual() {
  const props = PropertiesService.getScriptProperties();
  const SHEET_ID = props.getProperty('SHEET_ID') || '1MqW73MzPZzu_digcdUlcvjARRZMQIqZMwmNDz94fxj0';
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName('Bookings');
  if (!sheet) {
    sheet = ss.insertSheet('Bookings');
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 9).getValues()[0];
  if (headers.join('') === '') {
    sheet.getRange(1, 1, 1, 9).setValues([['CreatedAt', 'Name', 'Email', 'Phone', 'Start', 'End', 'Service', 'Notes', 'EventId']]);
  }
}