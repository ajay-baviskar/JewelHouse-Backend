function generateQuotationHTML({qt_id, image_url, clientDetails, goldDetails, diamondDetails, quotationSummary, date }) {
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
            margin-bottom: 12px;
               background-color: #0e4c35;
          }

 .logo {
            height: 45px;
          }


          .title {
            text-align: right;
          }

          h1 {
            margin: 0;
            font-size: 20px;
            color: #0e4c35;
          }

          h3 {
            margin: 14px 0 8px;
            color: #1a3c34;
            border-left: 4px solid #0e4c35;
            padding-left: 8px;
            font-size: 11px;
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
            padding: 3px;
            font-size: 7px;
            text-align: left;
          }

          th {
            background-color: #0e4c35;
            color: #fff;
          }

          .section {
            margin-bottom: 10px;
            padding: 3px;
            background: #f9fdfb;
            border: 1px solid #d8eae1;
            border-radius: 4px;
          }

          .total {
            font-weight: bold;
            color: #1e8449;
            font-size: 7px;
          }

          .note {
            margin-top: 12px;
            padding: 8px;
            border: 1px dashed #0e4c35;
            background: #f5fffa;
            border-radius: 4px;
          }

          .note h3 {
            margin-bottom: 4px;
            font-size: 7px;
            color: #0e4c35;
          }

          .note ul {
            padding-left: 18px;
            margin: 0;
            font-size: 9px;
          }

          .note li {
            margin-bottom: 4px;
            line-height: 1.4;
          }
            * {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 100px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
        </style>
      </head>
      <body>
        <div class="page-wrapper">
          <header>
<img src="http://62.72.33.172:4000/images/1755179872326-Copy of Untitled Design-Photoroom (1).png" alt="Client Image" style="height: 80px; display: block; margin: 0 auto;" />

           
          </header>
<div style="margin-top: 8px; margin-bottom: 12px;">
  <table style="border-collapse: collapse; font-size: 11px; border: none; color: inherit;">
    <tr>
      <td style = "border: none; color: inherit;">
        <strong>Quotation ID:</strong> ${qt_id}
      </td>
      <td style="text-align: right;border: none; color: inherit;">
        ${(() => {
          const [year, month, day] = date.split('-');
          return `
            <table style="display: inline-table; border-collapse: collapse; font-size: 10px;">
              <tr>
<td style="text-align: right;border: none; color: inherit;"> <strong>Date: </strong></td>
                <td style="border: 1px solid #0e4c35;   text-align: center;">${day}</td>
                <td style="border: 1px solid #0e4c35;   text-align: center;">${month}</td>
                <td style="border: 1px solid #0e4c35;   text-align: center;">${year}</td>
              </tr>
            </table>
          `;
        })()}
      </td>
    </tr>
  </table>
</div>
          <div class="section">

       <div class="row">
  <div class="column">
      <h3>Client Details</h3>
            <p><strong>Name:</strong> ${clientDetails.name}</p>
            <p><strong>Contact:</strong> ${clientDetails.contactNumber}</p>
            <p><strong>Category:</strong> ${goldDetails .category}</p>
           
  </div>
  <div class="column"" style = "padding-left: 120px;">
  <img src="${image_url}" 
     alt="Client Image" 
     style="max-width: 100%; height: 80px; border: 1px solid #ccc; border-radius: 6px; display: block; object-fit: contain;" />

<p><strong>Size:</strong> ${ goldDetails.jewelrySize}</p>



  </div>
</div>
</div>


          <div class="section">
            <h3>Gold Estimated</h3>
            <table>
              <thead>
                <tr>
                  <th>Purity</th><th>Color</th><th>Weight</th><th>Rate/gm</th><th>Gold Cost</th><th>Labour</th><th>Total Labour</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${goldDetails.goldPurity}</td>
                  <td>${goldDetails.goldColor}</td>
             
                  <td>${goldDetails.weight}</td>
                 <td>₹${Math.ceil(goldDetails.ratePerGram)}</td>
                <td>₹${Math.ceil(goldDetails.totalGoldCost)}</td>
                <td>₹${Math.ceil(goldDetails.labourCost)}</td>
                <td>₹${Math.ceil(goldDetails.totalLabourPrice)}</td>

                </tr>
              </tbody>
            </table>
          </div>






         <div class="section">
            <h3>Labour Estimated</h3>
            <table>
              <thead>
                <tr>
                  <th>Gold Weight</th><th>Rate/g</th><th>Labour Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                      <td>${goldDetails.weight}</td>
                 <td>₹${Math.ceil(goldDetails.ratePerGram)}</td>
                <td>₹${Math.ceil(goldDetails.totalLabourPrice)}</td
                </tr>
              </tbody>
            </table>
          </div>





          <div class="section">
            <h3>Diamond Estimated</h3>
            <table>
              <thead>
                <tr>
                  <th>Type</th><th>Shape</th><th>Size</th><th>Color</th><th>Clarity</th><th>Rate/Cts</th><th>Discount</th> <th>Offer</th><th>Total</th>
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
<td>₹${Math.ceil(d.ratePerCts)}</td>
                    <td>${d.discount}%</td>
                    <td>₹${Math.ceil(d.ratePerCtsAfterDis)}</td>
<td>₹${Math.ceil(d.totalAmount)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h3>Quotation Summary Estimated</h3>
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
