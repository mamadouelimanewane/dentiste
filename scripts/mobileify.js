const fs = require('fs');
const path = require('path');

const target = process.argv[2]; // 'patient', 'admin', 'staff'

const configs = {
    patient: {
        appId: 'com.dentoprestige.patient',
        appName: 'DentoPrestige Patient',
        server: { url: 'https://dentoprestige.vercel.app/mobile/client', cleartext: true }
    },
    admin: {
        appId: 'com.dentoprestige.admin',
        appName: 'DentoPrestige Admin',
        server: { url: 'https://dentoprestige.vercel.app/mobile/admin', cleartext: true }
    },
    staff: {
        appId: 'com.dentoprestige.staff',
        appName: 'DentoPrestige Practitioner',
        server: { url: 'https://dentoprestige.vercel.app/mobile/staff', cleartext: true }
    }
};

if (!configs[target]) {
    console.error('Usage: node scripts/mobileify.js <patient|admin|staff>');
    process.exit(1);
}

const config = configs[target];

// Update capacitor.config.json (or ts)
const capacitorConfig = {
    appId: config.appId,
    appName: config.appName,
    webDir: 'out',
    bundledWebRuntime: false,
    server: config.server
};

fs.writeFileSync(
    path.join(__dirname, '../capacitor.config.json'),
    JSON.stringify(capacitorConfig, null, 2)
);

console.log(`Successfully prepared for ${config.appName} APK build.`);
