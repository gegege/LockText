const plaintext = document.getElementById('plaintext');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');
const encryptButton = document.getElementById('encrypt-button');

encryptButton.addEventListener('click', () => {
    // パスワード一致の確認
    if (password.value !== passwordConfirm.value) {
        alert('パスワードが一致しません。');
        return;
    }
    // 暗号化処理の呼び出し
    encryptData(plaintext.value, password.value);
});

async function encryptData(text, password) {
    try {
        const enc = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCMでは12バイトが推奨

        // パスワードからキーを導出
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            enc.encode(password),
            {name: 'PBKDF2'},
            false,
            ['deriveKey']
        );

        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            {name: 'AES-GCM', length: 256},
            false,
            ['encrypt']
        );

        // テキストを暗号化
        const ciphertext = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            enc.encode(text)
        );

        // データフォーマットの作成
        const data = {
            header: {
                version: '1.0',
                encryptionAlgorithm: 'AES-256-GCM',
                keyDerivationFunction: 'PBKDF2',
                kdfIterations: 100000,
                salt: arrayBufferToBase64(salt),
                initializationVector: arrayBufferToBase64(iv),
                timestamp: new Date().toISOString()
            },
            body: arrayBufferToBase64(ciphertext)
        };

        // JSON文字列に変換
        const jsonString = JSON.stringify(data, null, 2);

        // ファイルとしてダウンロード
        downloadFile(jsonString, 'locktext.json');
    } catch (error) {
        console.error(error);
        alert('暗号化中にエラーが発生しました。');
    }
}

function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function downloadFile(content, fileName) {
    const blob = new Blob([content], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
}

const encryptedFileInput = document.getElementById('encrypted-file');
const decryptPassword = document.getElementById('decrypt-password');
const decryptButton = document.getElementById('decrypt-button');
const decryptedTextDiv = document.getElementById('decrypted-text');


decryptButton.addEventListener('click', () => {
    const file = encryptedFileInput.files[0];
    if (!file) {
        alert('ファイルを選択してください。');
        return;
    }
    // ファイルを読み込み、復号処理を呼び出す
    const reader = new FileReader();
    reader.onload = async () => {
        try {
            const data = JSON.parse(reader.result);
            await decryptData(data, decryptPassword.value);
        } catch (error) {
            console.error(error);
            alert('ファイルの読み込み中にエラーが発生しました。');
        }
    };
    reader.readAsText(file);
});

async function decryptData(data, password) {
    try {
        const enc = new TextEncoder();
        const dec = new TextDecoder();

        const salt = base64ToArrayBuffer(data.header.salt);
        const iv = base64ToArrayBuffer(data.header.initializationVector);
        const ciphertext = base64ToArrayBuffer(data.body);

        // パスワードからキーを導出
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            enc.encode(password),
            {name: 'PBKDF2'},
            false,
            ['deriveKey']
        );

        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: data.header.kdfIterations,
                hash: 'SHA-256'
            },
            keyMaterial,
            {name: 'AES-GCM', length: 256},
            false,
            ['decrypt']
        );

        // データを復号
        const decrypted = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            ciphertext
        );

        const plaintext = dec.decode(decrypted);
        decryptedTextDiv.textContent = plaintext;
    } catch (error) {
        console.error(error);
        alert('復号に失敗しました。パスワードが正しいか確認してください。');
    }
}

function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}