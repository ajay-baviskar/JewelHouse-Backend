// utils/generateQuotationOrderHTML.js
function generateQuotationOrderHTML({
  quotation,
  order,
  user
}) {
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
            background: #fff;
          }
          .page-wrapper {
            margin: 6px;
            padding: 10px 14px;
            background-color: #ffffff;
            border: 2px solid #0e4c35;
            border-radius: 6px;
          }
         header {
  text-align: center;
  padding: 6px 0;
  margin-bottom: 6px;
  background-color: #0e4c35;
}

header img {
  display: block;
  margin: 0 auto;
    height: 70px;
}

          h4 {
            margin: 6px 0 4px;
            font-size: 10px;
            color: #1e8449;
            border-left: 2px solid #0e4c35;
            padding-left: 4px;
            background: #f1f7f4;
          }
          .section p {
            margin: 2px 0;
            font-size: 9px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 2px;
            background-color: #fff;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 2px 4px;
            font-size: 9px;
            text-align: left;
          }
          th {
            background-color: #0e4c35;
            color: #fff;
          }
          .section {
            margin-bottom: 6px;
            padding: 2px;
            background: #f9fdfb;
            border: 1px solid #d8eae1;
            border-radius: 3px;
          }
          .total {
            font-weight: bold;
            color: #1e8449;
            font-size: 10px;
          }
          .note {
            margin-top: 8px;
            padding: 6px;
            border: 1px dashed #0e4c35;
            background: #f5fffa;
            border-radius: 3px;
          }
          .note h4 {
            margin-bottom: 4px;
            font-size: 11px;
            color: #0e4c35;
          }
          .note ul {
            padding-left: 16px;
            margin: 0;
            font-size: 10px;
          }
          .note li {
            margin-bottom: 3px;
            line-height: 1.3;
          }
          * { box-sizing: border-box; }
          .column {
            float: left;
            width: 50%;
            padding: 4px;
            font-size: 9px;
          }
          .row:after { content: ""; display: table; clear: both; }
          .page-break { page-break-before: always; }
          .main-title {
            font-size: 17px;
            font-weight: bold;
            color: #1e8449;
            text-align: center;
            margin-bottom: 6px;
          }
          .subtitle {
            font-size: 16px;
            text-align: center;
            margin-bottom: 10px;
          }
          .step-content { margin-bottom: 8px; }
          .step-number {
            font-size: 14px;
            background: #1e8449;
            color: #fff;
            border-radius: 50%;
            display: inline-block;
            padding: 2px 7px;
            margin-right: 6px;
            font-weight: bold;
            vertical-align: middle;
          }
          .step-title {
            font-size: 14px;
            color: #0e4c35;
            font-weight: bold;
            vertical-align: middle;
          }
          .step-description {
            font-size: 13px;
            color: #444;
            line-height: 1.4;
            margin-top: 3px;
          }
        </style>
      </head>
      <body>
        <div class="page-wrapper">
          <header>
            <img src="http://62.72.33.172:4000/images/1755179872326-Copy of Untitled Design-Photoroom (1).png" alt="Logo" />
          </header>

          <div style="margin-top: 8px; margin-bottom: 12px;">
            <table style="border-collapse: collapse; font-size: 11px; border: none; color: inherit; width:100%;">
              <tr>
                <td style="border: none; color: inherit;">
                  <strong>Quotation ID:</strong> ${quotation._id}
                </td>
                <td style="text-align: right; border: none; color: inherit;">
<strong>Date:</strong> ${(() => {
      const dateObj = new Date(quotation.date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    })()}
                </td>
              </tr>
            </table>
          </div>

    <div class="section">
  <div class="row" style="display: flex; align-items: center; justify-content: space-between; text-align: center;">
    
    <!-- Column 1: Client Details -->
    <div class="column" style="flex: 1; text-align: left;">
      <h4>Client Details</h4>
      <p><strong>Name:</strong> ${quotation.clientDetails.name}</p>
      <p><strong>Contact:</strong> ${quotation.clientDetails.contactNumber}</p>
      <p><strong>City:</strong> ${quotation.clientDetails.city}</p>
      <p><strong>Category:</strong> ${quotation.goldDetails.category}</p>
            <p><strong>Size:</strong> ${quotation.goldDetails.jewelrySize}</p>
    </div>

    <!-- Column 2: Image -->
    <div class="column" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <img 
        src="${quotation.image_url}" 
        alt="Client Image" 
        style="width:150px; height:90px; border: 1px solid #ccc; border-radius: 6px; object-fit: contain;" 
        onerror="this.onerror=null; this.src='http://62.72.33.172:4000/images/1755179872326-Copy of Untitled Design-Photoroom (1).png';"
      />
    </div>

   
    

  </div>
</div>

          <!-- GOLD COST -->
          <div class="section">
            <h4>Estimated Gold Cost</h4>
            <table>
              <thead>
                <tr>
                  <th>Purity</th><th>Color</th><th>Weight/gms</th><th>Rate/gms</th><th>Gold Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${quotation.goldDetails.goldPurity}</td>
                  <td>${quotation.goldDetails.goldColor}</td>
                  <td>${quotation.goldDetails.weight}</td>
                  <td>₹${Math.ceil(quotation.goldDetails.ratePerGram).toLocaleString("en-IN")}</td>
                  <td>₹${Math.ceil(quotation.goldDetails.totalGoldCost).toLocaleString("en-IN")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- LABOUR COST -->
          <div class="section">
            <h4>Estimated Labour Cost</h4>
            <table>
              <thead>
                <tr>
                  <th>Gold Weight/gms</th><th>Labour Cost</th><th>Labour Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${quotation.goldDetails.weight}</td>
                  <td>₹${Math.ceil(quotation.goldDetails.labourCost).toLocaleString("en-IN")}</td>
                  <td>₹${Math.ceil(quotation.goldDetails.totalLabourPrice).toLocaleString("en-IN")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- DIAMOND COST -->
               <div class="section">
  <h4>Estimated Diamond Cost</h4>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Shape</th>
        <th>cts</th>
        <th>Color</th>
        <th>Clarity</th>
        <th>Rate/Cts</th>
        <th>Discount</th>
        <th>Price/cts (Offer)</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${quotation.diamondDetails.map(d => `
        <tr>
          <td>${d.type}</td>
          <td>${d.shape}</td>

          <!-- ✅ Show size if CENTER, carats if STUDDED -->
          <td>
            ${d.type === "CENTER" ? (d.size || '-') : (d.type === "STUDDED" ? (d.carats || '-') : '')}
          </td>

          <td>${d.color}</td>
          <td>${d.clarity}</td>
          <td>₹${Math.ceil(d.ratePerCts).toLocaleString("en-IN")}</td>
          <td>${d.discount}%</td>
          <td>₹${Math.ceil(d.ratePerCtsAfterDis).toLocaleString("en-IN")}</td>
          <td>₹${Math.ceil(d.totalAmount).toLocaleString("en-IN")}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</div>

          

          <!-- SUMMARY -->
          <div class="section">
            <h4>Estimated Quotation Summary</h4>
            <table>
              <thead>
                <tr>
                  <th>Gold Total</th><th>Labour Total</th><th>Diamond Total</th><th>GST</th><th>Total Amount</th><th>Final Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>₹${Math.ceil(quotation.quotationSummary.goldCost).toLocaleString("en-IN")}</td>
                  <td>₹${Math.ceil(quotation.quotationSummary.labourCost).toLocaleString("en-IN")}</td>
                  <td>₹${Math.ceil(quotation.quotationSummary.diamondCost).toLocaleString("en-IN")}</td>
                  <td>₹${Math.ceil(quotation.quotationSummary.gst).toLocaleString("en-IN")}</td>
                  <td class="total">₹${Math.ceil(quotation.quotationSummary.total).toLocaleString("en-IN")}</td>
                  <td class="total">₹${Math.ceil(quotation.quotationSummary.finalTotal).toLocaleString("en-IN")}</td>

                </tr>
              </tbody>
            </table>
          </div>

           <div class="section">
            <h4>Order Deatils</h4>
            <table>
              <thead>
                <tr> <th>Order ID</th><th>Order Date</th><th>Expected Delivery Date</th><th>Address</th><th>Addhar Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${order._id}</td>
                  <td>${(() => {
      const dateObj = new Date(order.orderDate);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    })()}</td>
                  <td>${order.customerDetails?.expectedDeliverydate}</td>
                  <td>${order.customerDetails.address}</td>
                 <td>${order.customerDetails.aadhaarNumber}</td>

              
                </tr>
              </tbody>
            </table>
          </div>

          <!-- GENERATED BY -->
          <div class="section">
            <h4>Quotation Generated By</h4>
            <table>
              <thead>
                <tr><th>Name</th><th>Mobile Number</th></tr>
              </thead>
              <tbody>
                <tr><td>${user.name}</td><td>${user.mobile}</td></tr>
              </tbody>
            </table>
          </div>


        </div>

          <div class="page-break"></div>
          <br><br>
                  <div class="page-wrapper">

        <div style="padding: 30px 40px;">
          <div class="main-title">SHOP. SHINE. SLAY.</div>
          <div class="subtitle">Make purchase in - <strong>5 easy steps</strong> No pressure. No confusion. Just sparkle</div>

 <!-- Step 1 -->
<!-- Step 1 -->
<table style="border-collapse: collapse; border: none; width:100%;">
  <tr>
    <td style="width:60px; vertical-align:top; border:none;">
      <img src="http://62.72.33.172:4000/images/1755502214773-step1png.png" alt="Step Icon" style="width:100px;" />
    </td>
    <td style="vertical-align:top; padding-left:10px; border:none;">
      <div class="step-content">
        <span class="step-number">1</span>
        <span class="step-title">You Reach Out to Us</span>
        <div class="step-description">
          Looking for something elegant, bold, or uniquely you? Slide into our DMs, 
          <strong>WhatsApp, Instagram, or book a call.</strong><br>
          Tell us your vision—we’ll craft a tailored estimate piece that fits your style and your budget.
        </div>
      </div>
    </td>
  </tr>
</table>

<br>
<!-- Step 2 -->
<table style="border-collapse: collapse; border: none; width:100%;">
  <tr>
    <td style="border:none; width:60px; vertical-align:top;">
      <img src="http://62.72.33.172:4000/images/1755502683990-step2.png" alt="CAD Design Icon" style="width:100px;" />
    </td>
    <td style="border:none; vertical-align:top; padding-left:10px;">
      <div class="step-content">
        <span class="step-number">2</span>
        <span class="step-title">CAD Design</span>
        <div class="step-description">
          Once you love the estimate, our designers create a 
          <strong>3D CAD design of your piece.</strong> You approve it, or request tweaks — 
          <strong>nothing moves ahead until you’re 100% happy.</strong>
        </div>
      </div>
    </td>
  </tr>
</table>
<br>

<!-- Step 3 -->
<table style="border-collapse: collapse; border: none; width:100%;">
  <tr>
    <td style="border:none; width:60px; vertical-align:top;">
      <img src="http://62.72.33.172:4000/images/1755509154495-step3png.png" alt="Craft Icon" style="width:100px;" />
    </td>
    <td style="border:none; vertical-align:top; padding-left:10px;">
      <div class="step-content">
        <span class="step-number">3</span>
        <span class="step-title">We Craft Your Jewellery</span>
        <div class="step-description">
          Once you approve the design and <strong>pay the 25% advance</strong>, 
          our expert artisans begin crafting your jewellery. <br>
          We’ll send you photos of the final piece to ensure it’s perfect before shipping.
        </div>
      </div>
    </td>
  </tr>
</table>
<br>

<!-- Step 4 -->
<table style="border-collapse: collapse; border: none; width:100%;">
  <tr>
    <td style="border:none; width:60px; vertical-align:top;">
      <img src="http://62.72.33.172:4000/images/1755509228151-step4png.png" alt="Payment Icon" style="width:100px;" />
    </td>
    <td style="border:none; vertical-align:top; padding-left:10px;">
      <div class="step-content">
        <span class="step-number">4</span>
        <span class="step-title">Easy Payment</span>
        <div class="step-description">
          Before we ship, you’ll receive detailed photos to preview. Once you’re happy,
          <strong>we share the final bill and a secure payment link.</strong>
          Your piece is then prepped and packed with utmost care.
        </div>
      </div>
    </td>
  </tr>
</table>
<br>

<!-- Step 5 -->
<table style="border-collapse: collapse; border: none; width:100%;">
  <tr>
    <td style="border:none; width:60px; vertical-align:top;">
      <img src="http://62.72.33.172:4000/images/1755509275284-step5png.png" alt="Delivery Icon" style="width:100px;" />
    </td>
    <td style="border:none; vertical-align:top; padding-left:10px;">
      <div class="step-content">
        <span class="step-number">5</span>
        <span class="step-title">Secured Delivery</span>
        <div class="step-description">
          <strong>Every diamond is certified</strong> for complete transparency. <br>
          <strong>Once ready, your jewellery is delivered to your doorstep</strong> fully insured for total peace of mind.
        </div>
      </div>
    </td>
  </tr>
</table>



</div>
        </div>
      </body>
    </html>
  `;
}


module.exports = { generateQuotationOrderHTML };
