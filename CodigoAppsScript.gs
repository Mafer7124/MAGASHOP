const SPREADSHEET_ID = "1x0JQ4uwmKzubGKWtWmKf56L--M48Nx5cnpPhCkw9dOE";
const SHEET_NAME = "Pedidos";


function doGet() {

  return ContentService
    .createTextOutput(
      JSON.stringify({
        success: true,
        message: "API de pedidos MAGASHOP activa."
      })
    )
    .setMimeType(ContentService.MimeType.JSON);

}


function doPost(e) {

  try {

    const spreadsheet =
      SpreadsheetApp.openById(SPREADSHEET_ID);


    let sheet =
      spreadsheet.getSheetByName(SHEET_NAME);


    if (!sheet) {

      sheet =
        spreadsheet.insertSheet(SHEET_NAME);

      sheet.appendRow([
        "Fecha",
        "Productos",
        "Cantidades",
        "Total",
        "Estado"
      ]);

    }


    const data =
      JSON.parse(e.postData.contents);


    sheet.appendRow([
      new Date(),
      data.productos || "",
      data.cantidades || "",
      Number(data.total) || 0,
      "Pendiente de confirmación"
    ]);


    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true,
          message: "Pedido registrado correctamente."
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );


  } catch (error) {

    console.error(error);

    throw error;

  }

}
