# 🚀 cermati account registration automation (playwright)

this project contains the automated test suite to verify the account registration process on cermati.com.

**testing status:** positive test cases verify the form's validity up to the point where the "daftar" button is **enabled**, and one e2e test verifies the successful navigation to the otp verification page.

---

## ⚙️ system prerequisites

to run these tests, ensure you have the following installed:
1.  **node.js** (version 18 or newer)
2.  **npm** (node package manager)

---

## 📦 project setup and installation

follow these steps to set up the project locally:

1.  **clone the repository:**
    for those using **ssh** (recommended after initial setup):
    ```bash
    git clone git@github.com:foustinoasprilla/cermati-registration-playwright.git
    cd cermati-registration-playwright
    ```
    alternatively, using **https** (requires personal access token/pat for push):
    ```bash
    git clone [https://github.com/foustinoasprilla/cermati-registration-playwright.git](https://github.com/foustinoasprilla/cermati-registration-playwright.git)
    cd cermati-registration-playwright
    ```

2.  **install dependencies:**
    install playwright and other required packages:
    ```bash
    npm install
    ```

3.  **install playwright browsers:**
    download the necessary browser binaries (chromium, firefox, webkit):
    ```bash
    npx playwright install
    ```

---

## ▶️ running test cases

all positive test cases are defined in the `tests/registration.spec.js` file.

### 1. executing all test cases

run all test cases in parallel using the following command:

```bash
# run in visible mode (browser opens)
npx playwright test --headed

# run in headless mode (default, faster)
npx playwright test