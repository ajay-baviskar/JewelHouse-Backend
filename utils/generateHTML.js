function generateQuotationHTML({ clientDetails, goldDetails, diamondDetails, quotationSummary, date }) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 40px;
            background-color: #f9f9f9;
            color: #2c3e50;
          }

          header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }

          .logo {
            height: 60px;
          }

          .title {
            text-align: right;
          }

          h1 {
            margin: 0;
            font-size: 28px;
            color: #d4af37;
          }

          h3 {
            margin-top: 30px;
            color: #34495e;
            border-left: 5px solid #d4af37;
            padding-left: 10px;
            font-size: 20px;
          }

          p {
            margin: 4px 0;
            font-size: 15px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            background-color: #fff;
          }

          th {
            background-color: #d4af37;
            color: #fff;
            font-weight: bold;
            padding: 10px;
            border: 1px solid #e0e0e0;
            text-align: left;
          }

          td {
            padding: 10px;
            border: 1px solid #e0e0e0;
            font-size: 14px;
          }

          .summary p {
            font-size: 16px;
            margin: 8px 0;
          }

          .total {
            font-size: 20px;
            font-weight: bold;
            margin-top: 10px;
            color: #27ae60;
          }

          .section {
            margin-bottom: 40px;
            padding: 15px;
            background: #ffffff;
            border: 1px solid #eee;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <header>
          <img src="https://yourdomain.com/logo.png" alt="Company Logo" class="logo" />
          <div class="title">
            <h1>THE JEWEL HOUSE</h1>
            <p><strong>Date:</strong> ${date}</p>
          </div>
        </header>

        <div class="section">
          <h3>Client Details</h3>
          <p><strong>Name:</strong> ${clientDetails.name}</p>
          <p><strong>Contact:</strong> ${clientDetails.contactNumber}</p>
          <p><strong>Email:</strong> ${clientDetails.email}</p>
          <p><strong>Address:</strong> ${clientDetails.address}</p>
        </div>

        <div class="section">
          <h3>Gold Details</h3>
          <table>
            <thead>
              <tr>
                <th>Purity</th><th>Color</th><th>Size</th><th>Weight</th><th>Rate/gm</th><th>Gold Cost</th><th>Labour</th><th>Total Labour</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${goldDetails.goldPurity}</td>
                <td>${goldDetails.goldColor}</td>
                <td>${goldDetails.jewelrySize}</td>
                <td>${goldDetails.weight}</td>
                <td>₹${goldDetails.ratePerGram}</td>
                <td>₹${goldDetails.totalGoldCost}</td>
                <td>₹${goldDetails.labourCost}</td>
                <td>₹${goldDetails.totalLabourPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <h3>Diamond Details</h3>
          <table>
            <thead>
              <tr>
                <th>Type</th><th>Shape</th><th>Size</th><th>Color</th><th>Clarity</th><th>Weight</th><th>Rate/Cts</th><th>Discount</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${diamondDetails.map(d => `
                <tr>
                  <td>${d.type}</td>
                  <td>${d.shape}</td>
                  <td>${d.size}</td>
                  <td>${d.color}</td>
                  <td>${d.clarity}</td>
                  <td>${d.weight}</td>
                  <td>₹${d.ratePerCts}</td>
                  <td>${d.discount}%</td>
                  <td>₹${d.totalAmount}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="section summary">
          <h3>Quotation Summary</h3>
          <p><strong>Gold:</strong> ₹${quotationSummary.goldCost}</p>
          <p><strong>Labour:</strong> ₹${quotationSummary.labourCost}</p>
          <p><strong>Diamond:</strong> ₹${quotationSummary.diamondCost}</p>
          <p><strong>GST:</strong> ${quotationSummary.gst}%</p>
          <p class="total">Total: ₹${quotationSummary.total}</p>
        </div>
      </body>
    </html>
  `;
}

module.exports = { generateQuotationHTML };
