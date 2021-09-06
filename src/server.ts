import Express from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { private_key } from '../sheet-playground-key'
import 'dotenv/config';

const app = Express();
app.use(Express.json());

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || '';
const SHEET_ID = process.env.SHEET_ID || '';
const CLIENT_EMAIL = process.env.CLIENT_EMAIL || '';

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    await sheet.addRow(row);
  } catch (e) {
    console.error('Error: ', e);
  }
};

const newRow = { date: new Date().toISOString(), companyId: "0123456789", companyName: 'test', cancelReason: 'test' };

appendSpreadsheet(newRow);

app.listen({ port: '4000' }, () => console.log('🚀 Server started on port 4000'));
