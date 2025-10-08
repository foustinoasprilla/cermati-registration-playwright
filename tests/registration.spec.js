const { test, expect } = require('@playwright/test');

const REGISTER_URL = 'https://www.cermati.com/gabung';
const VERIFY_URL_REGEX = /.*(verifikasi-otp|verify-otp).*/;
const DAFTAR_BUTTON = 'button:has-text("Daftar")';


function generateTestData(domain = 'mailsac.com', namePattern = 'CLEAN', useRandomPhone = false) {
    const uniqueCounter = Date.now().toString().slice(-3); 
    const charCode = 65 + (uniqueCounter % 26);
    const alphabetCounter = String.fromCharCode(charCode); 
    

    let uniquePhone = '6289998881212'; // Default: Nomor Tetap
    if (useRandomPhone) {
        const randomTenDigits = Math.floor(Math.random() * 9000000000) + 1000000000;
        uniquePhone = `628${randomTenDigits}`;
    }
    
    let firstName = 'Foust';
    let lastName = `Testing ${alphabetCounter}`;
    
    if (namePattern === 'LONG') {
        firstName = 'IniNamaDepanYangSangatPanjangSekaliDanHanyaHuruf';
        lastName = 'IniNamaBelakangYangSangatPanjangSekaliDanHanyaHuruf';
    } else if (namePattern === 'CAPITAL') {
        firstName = 'TesterCapital'; 
        lastName = 'Automation'; 
    }

    return {
        email: `foust-crmt${uniqueCounter}@${domain}`,
        phone: uniquePhone, 
        firstName: firstName,
        lastName: lastName,
    };
}

test.describe('Pendaftaran Akun Cermati - Positive Cases', () => {

    test('TC 1: E2E Penuh - Registrasi Sukses ke Halaman OTP', async ({ page }) => {
        const testData = generateTestData('mailsac.com', 'CLEAN', true); 

        console.log(`\n--- Menjalankan TC 1: E2E Penuh | HP: ${testData.phone}`);
        
        await page.goto(REGISTER_URL);
        await page.waitForLoadState('domcontentloaded');


        await page.fill('[name="mobilePhone"]', testData.phone);
        await page.fill('[name="email"]', testData.email);
        await page.fill('[name="firstName"]', testData.firstName);
        await page.fill('[name="lastName"]', testData.lastName);
        await expect(page.locator(DAFTAR_BUTTON)).not.toBeDisabled({ timeout: 15000 });

        await page.click(DAFTAR_BUTTON); 

        await page.waitForLoadState('load', { timeout: 20000 });
        await expect(page).toHaveURL(VERIFY_URL_REGEX);
        console.log(`TC 1: Lulus! Proses E2E selesai.`);
    });


    test('TC 2: Validasi Form & Button Check (Nama Panjang)', async ({ page }) => {
        const testData = generateTestData('gmail.com', 'LONG', false); 

        console.log(`\n--- Menjalankan TC 2: Validasi Tombol (HP: ${testData.phone})`);
        
        await page.goto(REGISTER_URL);
        await page.waitForLoadState('domcontentloaded');

        await page.fill('[name="mobilePhone"]', testData.phone);
        await page.fill('[name="email"]', testData.email);
        await page.fill('[name="firstName"]', testData.firstName);
        await page.fill('[name="lastName"]', testData.lastName);
        
        await expect(page.locator(DAFTAR_BUTTON)).not.toBeDisabled({ timeout: 10000 });
        console.log(`TC 2: Lulus! Tombol 'Daftar' AKTIF untuk data panjang.`);
    });


    test('TC 3: Validasi Form & Button Check (Format Kapital)', async ({ page }) => {
        const testData = generateTestData('gmail.com', 'CAPITAL', false); 

        console.log(`\n--- Menjalankan TC 3: Validasi Tombol (HP: ${testData.phone})`);
        
        await page.goto(REGISTER_URL);
        await page.waitForLoadState('domcontentloaded');


        await page.fill('[name="mobilePhone"]', testData.phone);
        await page.fill('[name="email"]', testData.email);
        await page.fill('[name="firstName"]', testData.firstName);
        await page.fill('[name="lastName"]', testData.lastName);
        
        await expect(page.locator(DAFTAR_BUTTON)).not.toBeDisabled({ timeout: 10000 });
        console.log(`TC 3: Lulus! Tombol 'Daftar' AKTIF untuk data kapital.`);
    });
});