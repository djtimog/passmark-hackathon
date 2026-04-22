import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test.describe("Weather App - Search", () => {
  test("Search for Lagos", async ({ page }) => {
    test.setTimeout(60_000);
    await runSteps({
      page,
      userFlow: "Search for a specific location - Lagos",
      steps: [
        { description: "Navigate to https://weather-pi-one-74.vercel.app/" },
        {
          description: "Type Lagos in the search input",
          data: { value: "Lagos" },
        },
        { description: "Click on the search button" },
      ],
      assertions: [
        { assertion: "You can see the city Lagos and the country Nigeria" },
        { assertion: "You can see a temperature of degree celsuis" },
      ],
      test,
      expect,
    });
  });

  test("Search for London", async ({ page }) => {
    test.setTimeout(60_000);
    await runSteps({
      page,
      userFlow: "Search for a specific location - London ",
      steps: [
        { description: "Navigate to https://weather-pi-one-74.vercel.app/" },
        {
          description: "Type London in the search input",
          data: { value: "London" },
        },
        { description: "Click on the search button" },
      ],
      assertions: [
        {
          assertion:
            "You can see the city London  and the country United Kingdom",
        },
        { assertion: "You can see a temperature of degree celsuis" },
      ],
      test,
      expect,
    });
  });

  test("Search for invalid city", async ({ page }) => {
    test.setTimeout(60_000);
    await runSteps({
      page,
      userFlow: "Search for a specific location - xyzabc123 ",
      steps: [
        { description: "Navigate to https://weather-pi-one-74.vercel.app/" },
        {
          description: "Type xyzabc123 in the search input",
          data: { value: "xyzabc123" },
        },
        {
          description: "Click on the search button",
          waitUntil: "an error or result message is visible",
        },
      ],
      assertions: [
        {
          assertion: "You can see a red text displaying City not found",
        },
        { assertion: "You can see xyzabc123 in the search input" },
      ],
      test,
      expect,
    });
  });
});
