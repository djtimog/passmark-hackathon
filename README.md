# Passmark Hackathon — AI-Powered E2E Test Suite

A Passmark test suite covering 3 live web applications built by [@djtimog](https://github.com/djtimog). Built for the [Breaking Apps Hackathon](https://hashnode.com) by Bug0.

---

## Apps Tested

| App | URL | Description |
|---|---|---|
| SkyWatch Weather | https://weather-pi-one-74.vercel.app | Real-time weather dashboard |
| Chef Claude | https://chef-claude-one.vercel.app | AI-powered recipe generator |
| PixelCore Gaming | https://pixelcore-gaming.vercel.app | Esports team & tournament platform |

---

## Tech Stack

- [Passmark](https://github.com/bug0inc/passmark) — AI-powered browser testing
- [Playwright](https://playwright.dev) — Browser automation
- [OpenRouter](https://openrouter.ai) — AI gateway
- TypeScript

---

## Prerequisites

- Node.js v20 (recommended via [nvm-windows](https://github.com/coreybutler/nvm-windows))
- npm v9+

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/passmark-hackathon.git
cd passmark-hackathon
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install chromium
```

### 4. Set up environment variables

Create a `.env` file in the root of the project:

```ini
OPENROUTER_API_KEY=sk-or-your-key-here
PIXELCORE_EMAIL=your-test-account@email.com
PIXELCORE_PASSWORD=your-test-password
```

> **Get your OpenRouter API key:** Register at the [Breaking Apps Hackathon](https://hashnode.com) page to get a free key.

---

## ⚠️ Important Setup for PixelCore Tests

The PixelCore tests require a registered account. Follow these steps before running:

### Step 1 — Wake up the server
PixelCore is hosted on Vercel's free tier and may spin down after inactivity. Visit the site first and wait for it to fully load:

👉 https://pixelcore-gaming.vercel.app

### Step 2 — Create a test account
Go to the sign-in page and create a **dedicated test account** (do not use your personal account):

👉 https://pixelcore-gaming.vercel.app/sign-in

Click **"Sign up"** and register with the same email and password you put in your `.env` file.

### Step 3 — User Sign Up (Member Registration)
After creating your account, complete the user member registration:

👉 https://pixelcore-gaming.vercel.app/user-sign-up

This unlocks access to the dashboard and protected pages.

### Step 4 — Player Sign Up (Optional)
If you want to test player-specific features, also complete:

👉 https://pixelcore-gaming.vercel.app/player-sign-up

> Without completing Steps 2 and 3, the Authentication and Protected Pages tests will fail.

---

## Running Tests

### Run all tests
```bash
npm test
```

### Run a specific app's tests
```bash
npx playwright test tests/weather.spec.ts --project chromium
npx playwright test tests/chef-claude.spec.ts --project chromium
npx playwright test tests/pixelcore.spec.ts --project chromium
```

### Run a specific describe group
```bash
npx playwright test --project chromium -g "Authentication"
npx playwright test --project chromium -g "Schedule"
npx playwright test --project chromium -g "SkyWatch Weather App"
```

### View the test report
```bash
npm run test:report
```

---

## Test Structure

```
tests/
├── weather.spec.ts        # SkyWatch Weather App (15 tests)
│   ├── Search             # City search, invalid city
│   ├── Weather Details    # Feels like, humidity, wind, precipitation
│   ├── Unit Toggle        # Celsius, Fahrenheit, Kelvin
│   ├── Forecast           # Hourly and daily forecast
│   └── Theme              # Dark/light mode toggle
│
├── chef-claude.spec.ts    # Chef Claude AI Recipe App (8 tests)
│   ├── Empty State        # Initial load
│   ├── Adding Ingredients # Add, duplicate detection
│   ├── Removing Ingredients
│   └── AI Recipe Generation # Ask AI, suggestions, recipe details
│
└── pixelcore.spec.ts      # PixelCore Gaming Site (23 tests)
    ├── Homepage            # Hero, achievements, team, sponsors, blog
    ├── Navigation          # All nav links
    ├── Blog                # Post list, detail page
    ├── Contact Page        # All contact sections
    ├── Theme Toggle        # Dark/light mode
    ├── Authentication      # Sign in, invalid credentials, sign out
    ├── Protected Pages     # Schedule, tournaments, dashboard,
    │                         referrals, notifications
    └── Footer              # Quick links, copyright, join links
```

---

## Known Limitations

- **Chef Claude AI tests** require the Gemini API quota to be available. If the app returns a 429 error, wait a few minutes and try again.
- **PixelCore schedule tests** involve a multi-step tournament creation form. Each test runs the full flow from sign-in — expect 4-6 minutes per test.
- **REDIS_URL warnings** in the logs are expected and do not affect test results. Passmark uses Redis for step caching which is optional.
- Tests run in headed mode (`headless: false`) by default so you can watch them execute. Change to `headless: true` in `playwright.config.ts` for faster runs.

---

## Project Structure

```
passmark-hackathon/
├── tests/
│   ├── weather.spec.ts
│   ├── chef-claude.spec.ts
│   └── pixelcore.spec.ts
├── .env                    # Not committed - create manually
├── .gitignore
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Article

Read the full Hashnode article about this project:

👉 [Link to your Hashnode article here]

---

## Author

**Christian Ogunleye** ([@djtimog](https://github.com/djtimog))

Built with ❤️ for the Breaking Apps Hackathon by Bug0.