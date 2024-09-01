#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN  D8 // The ESP8266 pin D8
#define RST_PIN D2 // The ESP8266 pin D2 

MFRC522 rfid(SS_PIN, RST_PIN);

// Replace with your network credentials
const char* ssid = "Airtel_1260";
const char* password = "air52721";

// Replace with your server's IP address or domain name
const char* serverName = "http://192.168.1.9:3000/data"; // Adjust to match your server's IP and port

void setup() {
  Serial.begin(115200);
  
  // Initialize SPI and RFID
  SPI.begin();
  rfid.PCD_Init(); // Initialize MFRC522
  
  Serial.println("Tap an RFID/NFC tag on the RFID-RC522 reader");

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("Connected to Wi-Fi");
}

void loop() {
  if (rfid.PICC_IsNewCardPresent()) { // New tag is available
    if (rfid.PICC_ReadCardSerial()) { // NUID has been read
      MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
      Serial.print("RFID/NFC Tag Type: ");
      Serial.println(rfid.PICC_GetTypeName(piccType));

      // Print UID in Serial Monitor in the hex format
      String uidString = "UID:";
      for (int i = 0; i < rfid.uid.size; i++) {
        uidString += (rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
        uidString += String(rfid.uid.uidByte[i], HEX);
      }
      uidString.toUpperCase(); // Convert to uppercase
      Serial.println(uidString);

      // Send UID to the server
      if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        WiFiClient client;
        
        http.begin(client, serverName);
        http.addHeader("Content-Type", "application/json");

        String jsonData = "{\"uid\": \"" + uidString + "\"}";
        
        int httpResponseCode = http.POST(jsonData);
        
        if (httpResponseCode > 0) {
          String response = http.getString();
          Serial.println("Response: " + response);
        } else {
          Serial.println("Error: " + String(httpResponseCode));
        }
        
        http.end();
      }
      
      rfid.PICC_HaltA(); // Halt PICC
      rfid.PCD_StopCrypto1(); // Stop encryption on PCD
    }
  }

  delay(1000); // Wait for 1 second before checking for new tags again
}
