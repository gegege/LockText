
# **LockText**

A simple and secure encryption tool that works entirely in your browser.

## **Overview**

**LockText** is a web application that allows you to securely encrypt and decrypt text data. All operations are performed entirely in the browser, and no data or passwords are sent to the server. It provides a simple yet powerful solution for protecting and securely sharing sensitive information.

## **History**

History
In today's world, there are numerous cloud platforms for document management that are not only highly functional but also aesthetically pleasing and convenient. However, I felt hesitant to entrust these platforms with my plaintext passwords and sensitive data. Therefore, I sought a solution where I could securely store confidential data on a cloud platform at a low cost.

That said, if such a solution became reliant on vendor lock-in, it could potentially lead to disadvantages for users if the project could no longer continue. Since encryption and decryption can be implemented with basic JavaScript functions in the browser, by making the format publicly available, we can rest assured that even if the project encounters issues, the time will soon come when AI will be able to build user interfaces efficiently and resolve these issues with ease.

With this in mind, I prioritized leaving behind the data format and the minimum necessary framework, and with the help of generative AI, I launched this project in a very short time.

## **Main Features**

- **Complete Privacy Protection**: No data or passwords are sent to the server.
- **Strong Encryption**: Utilizes the industry-standard AES-256-GCM algorithm.
- **User-Friendly Interface**: Simple and intuitive design.
- **Cross-Platform**: Works on any modern web browser, regardless of the operating system.
- **Open Source**: The source code is available for transparency and trust.

## **Demo Site**

[LockText Demo Site](https://gegege.github.io/LockText/)

## **How to Get Started**

### **1. Clone the Repository**

```bash
git clone https://github.com/gegege/LockText.git
```

### **2. Start a Local Server**

#### **Method 1: Use VSCode Live Server**

1. Open the project in VSCode.
2. Open `public/index.html` and click "Go Live" at the bottom-right.

#### **Method 2: Use Python Simple HTTP Server**

```bash
cd public
python3 -m http.server 8000
```

Access `http://localhost:8000` in your browser.

### **3. Use the Application**

Access the application in your browser and follow the steps below to encrypt or decrypt data.

## **How to Use**

### **Encryption**

1. **Enter Text**: Input the text you want to encrypt.
2. **Set Password**: Enter a password and confirm it.
3. **Encrypt**: Click the "Encrypt and Download" button.
4. **Save File**: The encrypted file (e.g., `locktext.json`) will be downloaded.

### **Decryption**

1. **Select File**: Choose the encrypted file you want to decrypt.
2. **Enter Password**: Input the password you set during encryption.
3. **Decrypt**: Click the "Decrypt File" button.
4. **View Text**: The decrypted text will be displayed on the screen.

## **Data Format**

The encrypted file is saved in the following JSON format:

```json
{
  "header": {
    "version": "1.0",
    "encryptionAlgorithm": "AES-256-GCM",
    "keyDerivationFunction": "PBKDF2",
    "kdfIterations": 100000,
    "salt": "Base64 encoded salt",
    "initializationVector": "Base64 encoded IV",
    "timestamp": "ISO 8601 formatted timestamp"
  },
  "body": "Encrypted text (Base64 encoded)"
}
```

## **Security Information**

- **Password Management**: Your password is essential for decrypting the data. Be sure to store it safely.
- **Client-Side Processing**: All encryption and decryption are performed in the browser, with nothing sent to the server.
- **Open Source**: The source code is available for anyone to inspect and verify security.

## **Developer Information**

### **Directory Structure**

```
LockText/
├── public/             # Public directory
│   ├── index.html      # Main HTML file
│   ├── style.css       # Stylesheet
│   └── app.js          # Main JavaScript file
├── src/                # Source code (if needed)
├── assets/             # Assets like images and icons
├── .gitignore          # Git settings
├── README.md           # This file
└── LICENSE             # License information
```

### **Requirements**

- Modern web browser (Chrome, Firefox, Safari, Edge, etc.)
- Node.js and npm (if needed for development or build)

### **Build and Deploy**

No special build steps are required. Simply place the files in the `public` directory on a web server to run the application.

### **Development Steps**

1. **Clone the repository**: See the steps above.
2. **Start a development server**: Use Live Server or a local server.
3. **Edit the code**: Modify the files in the `public` directory.
4. **Create a Pull Request**: If you want to propose improvements or new features, please send a pull request.

## **Contributions**

Bug reports, feature suggestions, and pull requests are welcome. Please participate through Issues or Pull Requests.

## **License**

This project is released under the [MIT License](LICENSE).

## **Contact**

If you have any questions or suggestions, please contact us through the following:

- **Email**: ur68x6716@mozmail.com
- **GitHub Issues**: [Repository Issues Page](https://github.com/gegege/LockText/issues)

---

Thank you for trying **LockText**. We hope it helps you manage your sensitive information safely and easily.
