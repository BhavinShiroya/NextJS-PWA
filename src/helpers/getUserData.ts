// import { GoogleSpreadsheet } from 'google-spreadsheet';

// export async function getSheetData() {
//   const doc = new GoogleSpreadsheet('1Gu8wKgy-zDo4rU9QwxSwrtoL5wECU3eza7g0slquVtw');

//   console.log(doc);

//   // Load credentials from the JSON file you downloaded
//   await doc.useServiceAccountAuth({
//     client_email: 'new-skylight@new-skylight.iam.gserviceaccount.com',
//     private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDS0XMpZcGJzzo6\nC0JT4gnWF3OGLVwWv4hfaZLsFTdIMZUc2IYuhN5f/zmXBSu93J8/cE9cNmbo/VXz\nU7UCGJ+QtXXBKWGzJU4VesZnynPVAyNqDGR4mk76EP4oyC9i3G1Cazfli5TbNNwJ\nj7jBLqdVIidIi0wLV6txOlphA+nn7hujiqq8Ppk6n2oyYvrzXyE+6mWNkUybB1LP\nmqLwkmN1Hm4i16hNGkQVOfGoWBQp+rF829u+Apn/b6PHdvS2rtIzcYWOUUbCajBO\ncpt6xwX5ZVrzmGqiLBUlktEJMLyuuDKb9UbtC4te9Z+rmGtQmduT11t+Idl1rPoA\nNHY7lyFJAgMBAAECggEAFvnsG9DK5Di9OzZ/LPp7kTVm2jKvIM0Q4To1wKxqxR/f\nRSCtlhwVyt9bgNO30dZd1kmIoq+MrXuvzoha187EdD5spifbDa3lCdcC0OzKDUcN\naOlPGWxS63Lm6l2v+W217DlYgxhgebgT+6hJ7ecGZnNFlgTVfb55MUrXbw+gwm24\nuAfoAyForEfAXtCA6vqYXclq+esymEZbtoN4D60KW9T8+BDkp2vGjClOpB/YezUh\neng87NmEm67BoXAXJMwOpm65rPi973BbpNZ0e21Yxsj1TFYmnqSJn2wr9H5GLz12\ncqNIHjaKEP86sMcZwdcUQI2DJat16YW9oX3hBinaQQKBgQDtEJbbOK3PdTo8IeXT\nnbU3gXmtOmF8Y7GKtDFclYRJjL4gfq+nF6IUvneCxVpPmX2Fr4LCwACNTcBDznBi\nsISMLrV7rmXJtBycEhwVQTnqHLSznkVKJsGzu1BA8t2zBd19Nc/EWw3o+Nwog929\nM8yxeMI6vo+COJbnCFD55GdJQQKBgQDjqC3nMdUnPPERLI+/NAa8/fd0mHGPGkq/\nXKh0pNJO1O7wub34PwvLHIFBDYIiaZ/IU2wNardfHfmbz8O6aqgT8JZZA42tdjte\nZ3puIDe25bM+oprFPOYAKVh4fST63ZpPCHVdK5LPCIDMOnomvhewOkggkSvgfQ2A\nqAZyvPQOCQKBgQDHfCo1luBLrq2uZCfthswzRPSK3JGkBpAj07Wl3vtOmOx0k6Zj\nyPNO2Wff1wpD6TlDAYnbL45HWaHsbQ8NPNSM0dFNnldw/+sDOgn/qL9/TWCRtSFB\nYJOnFnxV6wi72Lek4V9QL/7oiGFahnxU9f3NaXynyisgvVXeW5UocxanAQKBgQCo\nLEvElzZr5wP5+N4zk95KbJ4JfreczAJdvLggesV1QK1GHSAtq30tzN/ay3zPqRFE\n7gNLIgNV+5GxvVhMdI+3MyoNladqdYXD5lM12QzvSl4QLhSBEcyiX+igEWpo+50L\nNydj7VVlJVXoCGbGCfT71QIFNNih3B9GZFlnFxh+6QKBgF9Y7hkGrNWxKsyVPFuv\nL+yUHbJZ4cpe5T6Pg1cnYWnMagQxVxw5TD/NiygtG47t3wmkb0OKHMoqlLdR9X4A\n+MJQMG26aGstiSze77m9CPLSXmbhIDlM0D3lCR/aLEtGkuMVdif/XptECith8Acf\nvBRdEKdJUaKn4VUbdP7C0mOO\n-----END PRIVATE KEY-----\n'.replace(/\\n/gm, '\n'),
//   });

//   // Load all worksheets
//   await doc.loadInfo();

//   // Assume the first sheet is your data
//   const sheet = doc.sheetsByIndex[0];

//   // Get all rows from the sheet
//   const rows = await sheet.getRows();

//   // Map rows to objects
//   const data = rows.map((row) => ({
//     ownerName: row.ownerName,
//     vehicleCompany: row.vehicleCompany,
//     vehicleNo: row.vehicleNo,
//     ownerPhoneNo: row.ownerPhoneNo,
//     flatNo: row.flatNo,
//   }));

//   return data;
// }

// utils/googleSheets.js
const { GoogleSpreadsheet } = require('google-spreadsheet')

export async function getUserData() {
  if (
    !(
      process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.NEXT_PUBLIC_GOOGLE_SHEET
    )
  ) {
    throw new Error(
      'GOOGLE credentials must be set as env vars `NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` ,`NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` and `NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID_PRODUCT`.'
    )
  }

  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET)

  await doc.useServiceAccountAuth({
    client_email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key:
      process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(
        /\\n/gm,
        '\n'
      )
  })
  //   // Load all worksheets
  await doc.loadInfo()

  // Assume the first sheet is your data
  const sheet = doc.sheetsByIndex[0]

  // Get all rows from the sheet
  const rows = await sheet.getRows()

  // Map rows to objects
  const data = rows.map((row: any) => ({
    ownerName: row.ownerName,
    vehicleCompany: row.vehicleCompany,
    vehicleNo: row.vehicleNo,
    ownerPhoneNo: row.ownerPhoneNo,
    flatNo: row.flatNo
  }))

  return JSON.parse(JSON.stringify(data))
}
