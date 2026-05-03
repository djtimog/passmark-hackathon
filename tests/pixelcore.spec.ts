import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

const BASE_URL = "https://pixelcore-gaming.vercel.app/";
const EMAIL = process.env.PIXELCORE_EMAIL!;
const PASSWORD = process.env.PIXELCORE_PASSWORD!;
const TIMEOUT = 240_000;
const PROTECTEDPAGES_TIMEOUT = 360_000;

const navigateTo = (path: string) => [
  { description: `Navigate to ${BASE_URL}${path}` },
];

const signIn = [
  ...navigateTo("sign-in"),
  {
    description: "Type email in the Email address or username field",
    data: { value: EMAIL },
  },
  {
    description: "Click the Continue button",
    waitUntil: "password field is visible",
  },
  {
    description: "Type password in the Password field",
    data: { value: PASSWORD },
  },
  {
    description: "Click the Continue button",
    waitUntil: "PixelCore homepage hero section is visible",
  },
];

test.describe("PixelCore Gaming Site", () => {
  test.describe("Homepage", () => {
    test("Hero section displays team name", async ({ page }) => {
      test.setTimeout(PROTECTEDPAGES_TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify hero section displays PixelCore team name",
        steps: [...navigateTo("")],
        assertions: [
          {
            assertion:
              "You can see the title 'PixelCore Esport Team' in the hero section",
          },
          {
            assertion: "You can see the PixelCore logo image in the navigation",
          },
        ],
        test,
        expect,
      });
    });

    test("Achievements show correct numbers", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify achievement numbers on homepage",
        steps: [
          ...navigateTo(""),
          { description: "Scroll down to the achievements section" },
        ],
        assertions: [
          { assertion: "You can see the number 8 next to International Champ" },
          {
            assertion:
              "You can see the number 5 next to International Runner up",
          },
          { assertion: "You can see the number 12 next to National Champ" },
        ],
        test,
        expect,
      });
    });

    test("Team members section displays player cards", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify team members section shows player cards",
        steps: [
          ...navigateTo(""),
          { description: "Scroll down to the Team section" },
        ],
        assertions: [
          {
            assertion:
              "You can see player cards with names and roles like Captain, Manager, Coach",
          },
          {
            assertion:
              "You can see the player name Bhabishya Dhakal Chhetri with the role Captain",
          },
          {
            assertion:
              "You can see the player name John Doe with the role Manager",
          },
        ],
        test,
        expect,
      });
    });

    test("Sponsors section is visible", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify sponsors section is visible on homepage",
        steps: [
          ...navigateTo(""),
          { description: "Scroll down to the Sponsor section" },
        ],
        assertions: [
          {
            assertion:
              "You can see the Sponsor section with multiple sponsor logos",
          },
          { assertion: "You can see the Poco sponsor logo" },
          { assertion: "You can see the Khalti sponsor logo" },
        ],
        test,
        expect,
      });
    });

    test("Blog preview section is visible", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify blog preview section on homepage",
        steps: [
          ...navigateTo(""),
          { description: "Scroll down to the Blog section" },
        ],
        assertions: [
          { assertion: "You can see the Blog section heading" },
          {
            assertion:
              "You can see at least one blog post title visible in the preview",
          },
          { assertion: "You can see a Read more link in the blog preview" },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Footer", () => {
    test("Footer shows quick links", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify footer quick links are visible",
        steps: [
          ...navigateTo(""),
          { description: "Scroll down to the footer" },
        ],
        assertions: [
          { assertion: "You can see the Quick Links section in the footer" },
          {
            assertion:
              "You can see links for Home, About us, and Schedule in the Quick Links section",
          },
        ],
        test,
        expect,
      });
    });

    test("Footer copyright text is visible", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify footer copyright text",
        steps: [
          ...navigateTo(""),
          { description: "Scroll down to the footer" },
        ],
        assertions: [
          {
            assertion:
              "You can see the copyright text 2024 Pixelcore in the footer",
          },
          {
            assertion:
              "You can see the designer credit TCR-timog in the footer",
          },
        ],
        test,
        expect,
      });
    });

    test("Footer Join with Us links are visible", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify footer Join with Us section links",
        steps: [
          ...navigateTo(""),
          { description: "Scroll down to the footer" },
        ],
        assertions: [
          { assertion: "You can see the Join with Us section in the footer" },
          {
            assertion:
              "You can see links for Becoming a member and Join the team",
          },
          { assertion: "You can see the Match streaming link in the footer" },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Navigation", () => {
    test("Clicking Blogs navigates to blog page", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Click Blogs in navigation and verify blog page loads",
        steps: [
          ...navigateTo(""),
          {
            description: "Click the Blogs link in the navigation bar",
            waitUntil: "blog page is visible",
          },
        ],
        assertions: [
          { assertion: "The URL has changed to include /blog" },
          { assertion: "You can see blog posts listed on the page" },
        ],
        test,
        expect,
      });
    });

    test("Clicking About Us navigates to about page", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Click About Us in navigation and verify about page loads",
        steps: [
          ...navigateTo(""),
          {
            description: "Click the About us link in the navigation bar",
            waitUntil: "about page is visible",
          },
        ],
        assertions: [
          {
            assertion:
              "The about page is visible with information about PixelCore",
          },
        ],
        test,
        expect,
      });
    });

    test("Clicking Contact navigates to contact page", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Click Contact in navigation and verify contact page loads",
        steps: [
          ...navigateTo(""),
          {
            description: "Click the Contact link in the navigation bar",
            waitUntil: "contact page is visible",
          },
        ],
        assertions: [
          {
            assertion:
              "You can see the heading Get In Touch on the contact page",
          },
        ],
        test,
        expect,
      });
    });

    test("Clicking logo navigates back to homepage", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Click logo from blog page and verify return to homepage",
        steps: [
          ...navigateTo("blog"),
          {
            description: "Click the PixelCore logo in the navigation bar",
            waitUntil: "homepage is visible",
          },
        ],
        assertions: [
          {
            assertion:
              "You can see the PixelCore Esport Team hero section on the homepage",
          },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Blog", () => {
    test("Blog page loads with post list visible", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify blog page loads with posts",
        steps: [...navigateTo("blog")],
        assertions: [
          {
            assertion:
              "You can see multiple blog post cards with titles and images",
          },
          {
            assertion:
              "You can see the blog post titled PUBG Mobile Pro League",
          },
        ],
        test,
        expect,
      });
    });

    test("Clicking a blog post opens the detail page", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Click a blog post and verify detail page opens",
        steps: [
          ...navigateTo("blog"),
          {
            description:
              "Click on the first blog post card under the sub section titled 'other blogs'",
            waitUntil: "blog detail page is visible",
          },
        ],
        assertions: [
          { assertion: "The URL has changed to a specific blog post URL" },
          { assertion: "You can see the full blog post content on the page" },
        ],
        test,
        expect,
      });
    });

    test("Blog detail page shows title and content", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify blog detail page has title and content",
        steps: [...navigateTo("blog/12345-543-25154")],
        assertions: [
          { assertion: "You can see the image associated with the blog post" },
          { assertion: "You can see a blog post title on the page" },
          {
            assertion:
              "You can see blog post content or body text below the title",
          },
          { assertion: "You can see a date on the blog post" },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Contact Page", () => {
    test("Get In Touch heading is visible", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify contact page loads with Get In Touch heading",
        steps: [...navigateTo("contact")],
        assertions: [
          { assertion: "You can see the heading Get In Touch on the page" },
          {
            assertion:
              "You can see the subtext about reaching out to PixelCore",
          },
        ],
        test,
        expect,
      });
    });

    test("Talk to Sales section shows phone number", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify Talk to Sales section has phone number",
        steps: [...navigateTo("contact")],
        assertions: [
          { assertion: "You can see the Talk to Sales section heading" },
          {
            assertion:
              "You can see a phone number starting with +234 in the Talk to Sales section",
          },
        ],
        test,
        expect,
      });
    });

    test("Media Inquiries section shows email address", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify Media Inquiries section has email address",
        steps: [...navigateTo("contact")],
        assertions: [
          { assertion: "You can see the Media Inquiries section" },
          { assertion: "You can see the email address media@pixelcore.com" },
        ],
        test,
        expect,
      });
    });

    test("Nigeria Lagos office details are visible", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify Nigeria Lagos office details on contact page",
        steps: [
          ...navigateTo("contact"),
          { description: "Scroll down to the global office section" },
        ],
        assertions: [
          { assertion: "You can see the Nigeria section heading" },
          {
            assertion:
              "You can see the Lagos office address containing Marina Street",
          },
          {
            assertion: "You can see a Lagos phone number starting with +234 1",
          },
        ],
        test,
        expect,
      });
    });

    test("Global Headquarters address is visible", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Verify Global Headquarters address on contact page",
        steps: [...navigateTo("contact")],
        assertions: [
          { assertion: "You can see the Global Headquarters section" },
          { assertion: "You can see the address 2 Canal Park Cambridge MA" },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Theme Toggle", () => {
    test("Toggling theme changes page appearance", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Toggle theme and verify page appearance changes",
        steps: [
          ...navigateTo(""),
          {
            description:
              "Click the Toggle theme button in the navigation and pick the dark theme option",
            waitUntil: "page theme changes",
          },
        ],
        assertions: [
          {
            assertion:
              "The page background color has changed after clicking the dark theme option",
          },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Authentication", () => {
    test("Sign in with valid credentials succeeds", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Sign in with valid credentials and verify success",
        steps: [...signIn],
        assertions: [
          { assertion: "You can see the PixelCore homepage after signing in" },
          {
            assertion:
              "You can see a user avatar or profile icon indicating you are logged in",
          },
        ],
        test,
        expect,
      });
    });

    test.describe("Sign in with invalid credentials", () => {
      test("Sign in with invalid email", async ({ page }) => {
        test.setTimeout(TIMEOUT);
        await runSteps({
          page,
          userFlow: "Sign in with wrong email and verify error",
          steps: [
            ...navigateTo("sign-in"),
            {
              description:
                "Type invalid@test.com in the Email address or username input",
              data: { value: "invalid@test.com" },
            },
            {
              description: "Click the Continue button",
              waitUntil: "error message is visible",
            },
          ],
          assertions: [
            {
              assertion:
                "You can see a red error message saying 'Couldn't find your account'",
            },
            {
              assertion:
                "You are still on the sign in page and not redirected to the homepage",
            },
          ],
          test,
          expect,
        });
      });

      test("Sign in with invalid password", async ({ page }) => {
        test.setTimeout(TIMEOUT);
        await runSteps({
          page,
          userFlow: "Sign in with wrong password and verify error",
          steps: [
            ...navigateTo("sign-in"),
            {
              description:
                "Type invalid@test.com in the Email address or username input",
              data: { value: process.env.PIXELCORE_EMAIL! },
            },
            {
              description: "Click the Continue button",
              waitUntil: "password field is visible",
            },
            {
              description: "Type wrongpassword in the Password input",
              data: { value: "wrongpassword123" },
            },
            {
              description: "Click the Continue button",
              waitUntil: "error message is visible",
            },
          ],
          assertions: [
            {
              assertion:
                "You can see a red error message saying 'Password is incorrect. Try again, or use another method.'",
            },
            {
              assertion:
                "You are still on the sign in page and not redirected to the homepage",
            },
          ],
          test,
          expect,
        });
      });
    });

    test("Sign out successfully logs user out", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Sign in then sign out and verify logged out state",
        steps: [
          ...signIn,
          {
            description:
              "Click the user avatar or profile icon to open the user menu",
          },
          {
            description: "Click the 'log out' button in the user menu",
            waitUntil: "sign in page or homepage is visible",
          },
        ],
        assertions: [
          {
            assertion:
              "You can see the sign in button or you are redirected to the homepage",
          },
          {
            assertion:
              "You no longer see the user avatar indicating you are logged out",
          },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Protected Pages", () => {
    test.describe("Redirects - Access without authentication", () => {
      const protectedPaths = [
        { path: "dashboard", name: "Dashboard" },
        { path: "dashboard/schedule", name: "Schedule" },
        { path: "dashboard/referrals", name: "Referrals" },
        { path: "dashboard/notifications", name: "Notifications" },
      ];

      for (const { path, name } of protectedPaths) {
        test(`${name} redirects to sign in when accessed without login`, async ({
          page,
        }) => {
          test.setTimeout(TIMEOUT);
          await runSteps({
            page,
            userFlow: `Access ${name} page without login and verify redirect`,
            steps: [...navigateTo(path)],
            assertions: [
              { assertion: "You are redirected to the sign in page" },
              { assertion: `You cannot see the ${name} page content` },
            ],
            test,
            expect,
          });
        });
      }
    });

    test.describe("Dashboard Overview", () => {
      test("Dashboard loads with user stats and tournaments", async ({
        page,
      }) => {
        test.setTimeout(PROTECTEDPAGES_TIMEOUT);
        await runSteps({
          page,
          userFlow: "Sign in and navigate to dashboard",
          steps: [...signIn, ...navigateTo("dashboard")],
          assertions: [
            {
              assertion: "You can see a section of upcoming events",
            },
            { assertion: "You can see a section for recommended tournaments" },
          ],
          test,
          expect,
        });
      });
    });

    test.describe("Referrals", () => {
      const navigateToReferrals = [
        ...signIn,
        ...navigateTo("dashboard/referrals"),
      ];

      test("Referrals page shows referral link and code", async ({ page }) => {
        test.setTimeout(PROTECTEDPAGES_TIMEOUT);
        await runSteps({
          page,
          userFlow: "Sign in and navigate to referrals page",
          steps: navigateToReferrals,
          assertions: [
            {
              assertion:
                "You can see three cards with the description of (Copy Referral Link, Copy Referral Code, Share) that can be copied",
            },
            {
              assertion:
                "You can see a table of referred friends or an empty table state",
            },
          ],
          test,
          expect,
        });
      });

      test("Referral link copy functionality works", async ({ page }) => {
        test.setTimeout(PROTECTEDPAGES_TIMEOUT);
        await runSteps({
          page,
          userFlow: "Copy referral link and verify copy action",
          steps: [
            ...navigateToReferrals,
            { description: "Click the Copy referral link card" },
          ],
          assertions: [
            {
              assertion:
                "You can see a checkmark icon or tick symbol on the Copy Referral Link card indicating it was copied successfully",
            },
          ],
          test,
          expect,
        });
      });
    });

    test.describe("Notifications", () => {
      const navigateToNotifications = [
        ...signIn,
        ...navigateTo("dashboard/notifications"),
      ];

      test("Notification Center page shows unread messages count and notification list", async ({
        page,
      }) => {
        test.setTimeout(PROTECTEDPAGES_TIMEOUT);
        await runSteps({
          page,
          userFlow: "Sign in and navigate to Notification Center",
          steps: navigateToNotifications,
          assertions: [
            {
              assertion: "You can see the heading 'Notifications' on the page",
            },
            {
              assertion:
                "You can see the text 'You have 3 unread messages' or similar unread count",
            },
            {
              assertion:
                "You can see Push Notifications section with description 'Send notifications to your Email'",
            },

            {
              assertion:
                "You can see timestamps below to each notification (e.g., '1 hour ago', '2 hours ago')",
            },
            { assertion: "You can see a 'Mark all as read' button" },
          ],
          test,
          expect,
        });
      });

      test("Mark all as read clears unread messages", async ({ page }) => {
        test.setTimeout(PROTECTEDPAGES_TIMEOUT);
        await runSteps({
          page,
          userFlow: "Mark all notifications as read",
          steps: [
            ...navigateToNotifications,
            {
              description: "Click the 'Mark all as read' button",
              waitUntil:
                "unread count updates or notifications are marked read",
            },
          ],
          assertions: [
            {
              assertion: "The unread messages count changes to 0 or disappears",
            },
            {
              assertion:
                "The 'You have 0 unread messages' or similar text is visible",
            },
            { assertion: "Notifications no longer show unread indicators" },
          ],
          test,
          expect,
        });
      });

      test("Push Notifications section is visible with email description", async ({
        page,
      }) => {
        test.setTimeout(PROTECTEDPAGES_TIMEOUT);
        await runSteps({
          page,
          userFlow: "Verify Push Notifications section on Notification Center",
          steps: [
            ...navigateToNotifications,
            {
              description: "Turn on the Push Notifications toggle if it's off",
            },
          ],
          assertions: [
            {
              assertion:
                "You can see the description 'Send notifications to your Email'",
            },
            {
              assertion:
                "You can see the toggle is in the on position indicating push notifications are enabled",
            },
          ],
          test,
          expect,
        });
      });
    });
  });
});
