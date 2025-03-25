document.getElementById("wifiForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  let ssid = document.getElementById("ssid").value;
  let password = document.getElementById("password").value;
  
  if (!ssid || !password) {
      alert("Please enter both SSID and password.");
      return;
  }

  let qrData = `WIFI:S:${ssid};T:WPA;P:${password};;`;
  let qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qrData)}`;
  
  // Display QR Code and details
  document.getElementById("qrCode").src = qrCodeURL;
  document.getElementById("displaySSID").textContent = ssid;
  document.getElementById("displayPassword").textContent = password;

  // Show the QR code container
  document.getElementById("qrContainer").style.display = "block";
});

document.getElementById("downloadButton").addEventListener("click", function() {
  let ssid = document.getElementById("displaySSID").textContent;
  let password = document.getElementById("displayPassword").textContent;
  let qrCodeSrc = document.getElementById("qrCode").src;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add WiFi details to the PDF
  doc.setFontSize(18);
  doc.text("WiFi Login Details", 20, 20);
  doc.setFontSize(12);
  doc.text(`Network Name: ${ssid}`, 20, 40);
  doc.text(`Password: ${password}`, 20, 50);

  // Add the QR code image to the PDF (increased size)
  doc.addImage(qrCodeSrc, 'PNG', 20, 60, 150, 150);  // Adjusted size

  // Save the PDF
  doc.save(`${ssid}_WiFi_Card.pdf`);
});
