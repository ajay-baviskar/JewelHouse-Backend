function generateQuotationHTML({ clientDetails, goldDetails, diamondDetails, quotationSummary, date }) {
    return `
    <html>
      <head>
        <style>
          @page {
            size: letter;
            margin: 0;
          }

          html, body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #2c3e50;
            background: #ffffffff;
          }

          .page-wrapper {
            margin: 10px;
            padding: 16px 20px;
            background-color: #ffffff;
            border: 2px solid #0e4c35;
            box-shadow: 0 0 6px rgba(0,0,0,0.2);
            border-radius: 8px;
          }

          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #c2c2c2;
            padding-bottom: 6px;
            margin-bottom: 14px;
          }

 .logo {
            height: 45px;
          }


          .title {
            text-align: right;
          }

          h1 {
            margin: 0;
            font-size: 22px;
            color: #0e4c35;
          }

          h3 {
            margin: 14px 0 8px;
            color: #1a3c34;
            border-left: 4px solid #0e4c35;
            padding-left: 8px;
            font-size: 13px;
            background: #f1f7f4;
          }

          p {
            margin: 1px 0;
            font-size: 11px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4px;
            background-color: #fff;
          }

          th, td {
            border: 1px solid #ccc;
            padding: 5px;
            font-size: 10px;
            text-align: left;
          }

          th {
            background-color: #0e4c35;
            color: #fff;
          }

          .section {
            margin-bottom: 12px;
            padding: 8px;
            background: #f9fdfb;
            border: 1px solid #d8eae1;
            border-radius: 4px;
          }

          .total {
            font-weight: bold;
            color: #1e8449;
            font-size: 12px;
          }

          .note {
            margin-top: 14px;
            padding: 10px;
            border: 1px dashed #0e4c35;
            background: #f5fffa;
            border-radius: 4px;
          }

          .note h3 {
            margin-bottom: 6px;
            font-size: 12px;
            color: #0e4c35;
          }

          .note ul {
            padding-left: 18px;
            margin: 0;
            font-size: 10px;
          }

          .note li {
            margin-bottom: 4px;
            line-height: 1.4;
          }
        </style>
      </head>
      <body>
        <div class="page-wrapper">
          <header>
            <img src="http://62.72.33.172:4000/images/logo.png" alt="Company Logo" class="logo" />

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
                  <th>Type</th><th>Shape</th><th>Size</th><th>Color</th><th>Clarity</th><th>Rate/Cts</th><th>Discount</th><th>Total</th>
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
                    <td>₹${d.ratePerCts}</td>
                    <td>${d.discount}%</td>
                    <td>₹${d.totalAmount}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h3>Quotation Summary</h3>
            <table>
              <thead>
                <tr>
                  <th>Gold Total</th><th>Labour Total</th><th>Diamond Total</th><th>GST</th><th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>₹${quotationSummary.goldCost}</td>
                  <td>₹${quotationSummary.labourCost}</td>
                  <td>₹${quotationSummary.diamondCost}</td>
                  <td>${quotationSummary.gst}</td>
                  <td class="total">₹${quotationSummary.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="note">
            <h3>Notes</h3>
            <ul>
              <li><strong>All our diamonds</strong> are earth-friendly lab-grown diamonds.</li>
              <li>This design is specially crafted for you. There is a possibility of <strong>15% variance</strong> (more or less) in gold and diamond usage compared to the estimate above.</li>
              <li>Gold weight and making charges will be charged <strong>based on actual usage</strong>, not the estimate above.</li>
              <li><strong>Lifetime backup & exchange</strong> applicable: Get <strong>100% exchange value</strong> for gold and <strong>80% exchange value</strong> for diamonds as per prevailing market rates.</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = { generateQuotationHTML };
