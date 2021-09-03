import Express from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const app = Express();

const SPREADSHEET_ID = '1OxWJQzZXaADLszog5bZPeuUDs5rb2Y7nV2eLDa6F6jg';
const SHEET_ID = '0';
const CLIENT_EMAIL = 'demo-985@sheet-playground-324919.iam.gserviceaccount.com';
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCjutGmbTjcPm9+\nmH0PooebIUve/E4Bm8TbT2k7HAApklycAskvH0n9imp42vF9ufgHcE9Gt1qLMnlo\nSrOT+bIFqc2SYGrPl/W2OEGK3nFMFUONe8BK3naZuRed0ZRLF9pKeps49r1M8xiv\nJMYnjkB/Qnf6XrXlNgTf8DW8wqP27ldyO8+AYX/OzRAw3tGkoUFOKtzgANqRphzg\nGaMdkuCGXS77NnLUwk8mNmzCxzRWlYVuA5LXlYbKOTxdCndJ8DvyUqRb4AZv8JIT\nn5QDH1/UozM3ujiFH0ClZEL4Tw2HDGbAfqMs1oynnkZ+VAX8GtAsxUG6KWll5Btw\nPtacec3FAgMBAAECggEAIF9A8fCw+BzxIvzn5zY5rSKrc2J70uYXSUxdcEY0QwPx\nAxiq6gH7+WELdatGaZciMuhSCFea06BOcGAquuR4/hUpc9pT7Akt2BIt5VTfXk1q\n/peb+MGc/f5ibL4CHcnQy36L37qrSYJcHE7/TdVaq7665ZohyTjBxHwkR9bNH/aF\nZy5gg+H+8FhbPguczNnrjO3+1TZ1PQ9F3u1MWThxXX+dQZABctAKmQ50PwVt/a5H\nVVwp1MpuN1zVP1tdQexX3htAZ2n/rMAVR25LzlTH1Kq7brIaVaugBKt74G11CkSx\n+IOZ+H5v9XlylQLrh0edJoQF/AcPIXhZ43+6YouxqQKBgQDYWPMkh2v3Y4NA3/ed\n/Y4F7RMktfIuryce1cOOFCRqUqZwAsyxD8ycly1flmQB5NNFhYAhPRN6/UTxdNDb\n5NOHY2q8hUyU0p9+7LLGc3kf6gJDOJ5a4H6ryDjyBMX3xaTktmSnSTqlRnJ168zx\n5UXGOWwxZnBVk//tVB54mayoaQKBgQDBvQpDVaWHB4bip5e4K5FejwfUeKSaxnde\nIdLLcEImruVpKM0w9Su5NHIdliuXk2dcCKrQka+84yURu6MmJO0YosdRKW6ILS21\nxwzS1+6OKcn8EHHKjYmisU9IM2+wSVgh9t36kENU09W6wxHCMIXRDd9eWrnM43NG\nQBdDA2Cu/QKBgG0VTGMatOFjl4ZaZuuOMNHkG0bjRl0rizoM5jD5DvNdAPZxMuwD\n31MFFqefmIUr7yqaiWQ4+12D3gMwty5oTg9xnRu4ykgveqPwjKNrDaN9xe5G2fFQ\nSA4tQiklJvwq910qac2/Koay4nt6jTdaNrgfs+GkmPdNTDlJtKNyOJAhAoGBAJoL\nAjcJyWR08qYTFYqFcb+awGILTu4VseGxyRai+qYhWB1mKMitmAdZkQa/WYfa10sR\nRSgzPmVUwiu4Yv+4SqDVBOAerlkuevLXAvY+ZNq6lXSLar7gDTjD/MLuyvaDSsUu\nsc9Bl5fCG2W1JtCdnjjb6+ftAWDM1OJdoWFSNTTNAoGAfgvggLMepW+0i5E22PHh\nnW6Aa+HhSnqS4gKdf5CkDOClq2UCOHWnFd7rh8cev5E3s06M5+QiDX/VFc6WlwDy\ndXIC8U1FTgjGyJwX7R54a1eHWigkBD6Uuv6MMy8YyVYbniuvIdOnp82sHAKF6ed6\nWjsF8F0AY6PUTL59QlJxHFg=\n-----END PRIVATE KEY-----\n';

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
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