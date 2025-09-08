function generateQuotationHTML({qt_id, image_url, clientDetails, goldDetails, diamondDetails, quotationSummary, date, userName, userMobile }) {
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

          * { box-sizing: border-box; }

          .column { float: left; width: 50%; padding: 10px; }
          .row:after { content: ""; display: table; clear: both; }

          /* PAGE BREAK for second page */
          .page-break { page-break-before: always; }

          /* Second page styles */
        .main-title {
  font-size: 16px; /* smaller than 18px */
  font-weight: bold;
  color: #1e8449;
  text-align: center;
  margin-bottom: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.subtitle {
  font-size: 14px; /* was 14px */
  text-align: center;
  margin-bottom: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
  /* Step Section Styling */
  .step-content {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-bottom: 12px;
  }

  .step-number {
    font-size: 13px;
    background: #1e8449;
    color: #fff;
    border-radius: 50%;
    display: inline-block;
    padding: 4px 9px;
    margin-right: 8px;
    font-weight: bold;
    vertical-align: middle;
  }

  .step-title {
    font-size: 13px;
    color: #0e4c35;
    font-weight: bold;
    vertical-align: middle;
  }

  .step-description {
    font-size: 11px;
    color: #444;
    line-height: 1.5;
    margin-top: 5px;
  }
</style>

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
<strong>Date:</strong> ${(() => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
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
                        <p><strong>City:</strong> ${clientDetails.city}</p>

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
            <h3>Estimated Gold Cost</h3>
            <table>
              <thead>
                <tr>
                  <th>Purity</th><th>Color</th><th>Weight/gms</th><th>Rate/gms</th><th>Gold Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${goldDetails.goldPurity}</td>
                  <td>${goldDetails.goldColor}</td>
             
                  <td>${goldDetails.weight}</td>
    <td>₹${Math.ceil(goldDetails.ratePerGram).toLocaleString("en-IN")}</td>
<td>₹${Math.ceil(goldDetails.totalGoldCost).toLocaleString("en-IN")}</td>

                </tr>
              </tbody>
            </table>
          </div>






         <div class="section">
            <h3>Estimated Labour Cost</h3>
            <table>
              <thead>
                <tr>
                  <th>Gold Weight/gms</th><th>Labour Cost</th><th>Labour Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                      <td>${goldDetails.weight}</td>
<td>₹${Math.ceil(goldDetails.labourCost).toLocaleString("en-IN")}</td>
<td>₹${Math.ceil(goldDetails.totalLabourPrice).toLocaleString("en-IN")}</td>

                </tr>
              </tbody>
            </table>
          </div>





          <div class="section">
            <h3>Estimated Diamond Cost</h3>
            <table>
              <thead>
                <tr>
                  <th>Type</th><th>Shape</th><th>cts</th><th>Color</th><th>Clarity</th><th>Rate/Cts</th><th>Discount</th> <th>Price/cts(Offer)</th><th>Total</th>
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
<td>₹${Math.ceil(d.ratePerCts).toLocaleString("en-IN")}</td>
                    <td>${d.discount}%</td>
<td>₹${Math.ceil(d.ratePerCtsAfterDis).toLocaleString("en-IN")}</td>
<td>₹${Math.ceil(d.totalAmount).toLocaleString("en-IN")}</td>
           </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h3>Estimated Quotation Summary </h3>
            <table>
              <thead>
                <tr>
                  <th>Gold Total</th><th>Labour Total</th><th>Diamond Total</th><th>GST</th><th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
<td>₹${Math.ceil(quotationSummary.goldCost).toLocaleString("en-IN")}</td>
<td>₹${Math.ceil(quotationSummary.labourCost).toLocaleString("en-IN")}</td>
<td>₹${Math.ceil(quotationSummary.diamondCost).toLocaleString("en-IN")}</td>
<td>₹${Math.ceil(quotationSummary.gst).toLocaleString("en-IN")}</td>
<td class="total">₹${Math.ceil(quotationSummary.total).toLocaleString("en-IN")}</td>

                </tr>
              </tbody>
            </table>
          </div>


 






           <div class="section">
            <h3>Quotation Generated By</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
<td>${userName}</td>
<td>${userMobile}</td>

                </tr>
              </tbody>
            </table>
          </div>





       <div class="note">
  <h3>Notes</h3>
  <ul>
    <li><strong>All our diamonds</strong> are earth friendly <strong>CVD (Type II a)</strong> lab grown diamonds.</li>
    <li>This design is specially crafted for you. There is a possibility of <strong>5% variance</strong> (more or less) in gold and diamond usage compared to the estimate above.</li>
    <li><strong>Gold weight</strong> and <strong>making charges</strong> will be charged based on actual usage.</li>
    <li>We offer <strong>85% buyback</strong>, <strong>100% exchange</strong> and <strong>Lifetime guarantee</strong> on diamonds purchased from us.</li>
    <li>To book your order you need to pay <strong>25% advance</strong> against the estimated value above and the <strong>balance payment</strong> on dispatch.</li>
  </ul>
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

module.exports = { generateQuotationHTML };
