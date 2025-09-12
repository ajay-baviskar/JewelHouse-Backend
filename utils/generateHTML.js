function generateQuotationHTML({
  qt_id,
  image_url,
  clientDetails,
  goldDetails,
  diamondDetails,
  quotationSummary,
  date,
  userName,
  userMobile
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
  height: 60px;
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
                  <strong>Quotation ID:</strong> ${qt_id}
                </td>
                <td style="text-align: right; border: none; color: inherit;">
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
                <h4>Client Details</h4>
                <p><strong>Name:</strong> ${clientDetails.name}</p>
                <p><strong>Contact:</strong> ${clientDetails.contactNumber}</p>
                <p><strong>City:</strong> ${clientDetails.city}</p>
                <p><strong>Category:</strong> ${goldDetails.category}</p>
              </div>
              <div class="column" style="text-align:center;">
                <img src="${image_url}" alt="Client Image" style="max-width: 100%; height: 60px; border: 1px solid #ccc; border-radius: 6px; object-fit: contain;" />
                <p><strong>Size:</strong> ${goldDetails.jewelrySize}</p>
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
                  <td>${goldDetails.goldPurity}</td>
                  <td>${goldDetails.goldColor}</td>
                  <td>${goldDetails.weight}</td>
                  <td>₹${Math.ceil(goldDetails.ratePerGram).toLocaleString("en-IN")}</td>
                  <td>₹${Math.ceil(goldDetails.totalGoldCost).toLocaleString("en-IN")}</td>
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
                  <td>${goldDetails.weight}</td>
                  <td>₹${Math.ceil(goldDetails.labourCost).toLocaleString("en-IN")}</td>
                  <td>₹${Math.ceil(goldDetails.totalLabourPrice).toLocaleString("en-IN")}</td>
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
                  <th>Type</th><th>Shape</th><th>cts</th><th>Color</th><th>Clarity</th><th>Rate/Cts</th><th>Discount</th><th>Price/cts(Offer)</th><th>Total</th>
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

          <!-- SUMMARY -->
          <div class="section">
            <h4>Estimated Quotation Summary</h4>
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

          <!-- GENERATED BY -->
          <div class="section">
            <h4>Quotation Generated By</h4>
            <table>
              <thead>
                <tr><th>Name</th><th>Mobile Number</th></tr>
              </thead>
              <tbody>
                <tr><td>${userName}</td><td>${userMobile}</td></tr>
              </tbody>
            </table>
          </div>

          <!-- NOTES -->
          <div class="note">
            <h4>Notes</h4>
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

