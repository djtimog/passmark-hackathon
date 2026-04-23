import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

const BASE_URL = "https://weather-pi-one-74.vercel.app/";

const searchCity = (city: string) => [
  { description: `Navigate to ${BASE_URL}` },
  { description: `Type ${city} in the search input`, data: { value: city } },
  { description: "Click on the search button" },
];

const TIMEOUT = 150_000;

test.describe("SkyWatch Weather App", () => {
  test.describe("Search", () => {
    test("Search for Lagos", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Search for a specific location - Lagos",
        steps: [...searchCity("Lagos")],
        assertions: [
          { assertion: "You can see the city Lagos and the country Nigeria" },
          { assertion: "You can see a temperature in degrees celsius" },
        ],
        test,
        expect,
      });
    });

    test("Search for London", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Search for a specific location - London",
        steps: [...searchCity("London")],
        assertions: [
          {
            assertion:
              "You can see the city London and the country United Kingdom",
          },
          { assertion: "You can see a temperature in degrees celsius" },
        ],
        test,
        expect,
      });
    });

    test("Search for invalid city", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Search for an invalid city and see error message",
        steps: [
          ...searchCity("xyzabc123"),
          {
            description: "Wait for error or result message",
            waitUntil: "an error or result message is visible",
          },
        ],
        assertions: [
          { assertion: "You can see a red text displaying City not found" },
          { assertion: "You can see xyzabc123 in the search input" },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Weather Details", () => {
    test("Shows feels like, humidity, wind, precipitation", async ({
      page,
    }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Validating weather detail cards",
        steps: [
          ...searchCity("Lagos"),
          { description: "Scroll down to see the weather details cards" },
        ],
        assertions: [
          {
            assertion:
              "You can see a Text Feels Like and a temperature in celsius below it",
          },
          {
            assertion: "You can see a Text Humidity and a percentage below it",
          },
          { assertion: "You can see a Text Wind and a speed in km/h below it" },
          {
            assertion:
              "You can see a Text Precipitation and a value in mm below it",
          },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Unit Toggle", () => {
    test("Toggles between Celsius and Fahrenheit", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Toggles between Celsius and Fahrenheit",
        steps: [
          ...searchCity("Lagos"),
          {
            description:
              "Click on the unit toggle button to switch to Fahrenheit",
            waitUntil: "temperature unit changes to Fahrenheit",
          },
        ],
        assertions: [
          { assertion: "You can see the temperature displayed with °F symbol" },
          { assertion: "The unit toggle button now shows Fahrenheit (°F)" },
        ],
        test,
        expect,
      });
    });

    test("Toggles between Celsius and Kelvin", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Toggles between Celsius and Kelvin",
        steps: [
          ...searchCity("Lagos"),
          {
            description: "Click on the unit toggle button to switch to Kelvin",
            waitUntil: "temperature unit changes to Kelvin",
          },
        ],
        assertions: [
          { assertion: "You can see the temperature displayed with K symbol" },
          { assertion: "The unit toggle button now shows Kelvin (K)" },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Forecast", () => {
    test("Hourly forecast visible", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Validating the hourly forecast section",
        steps: [
          ...searchCity("Lagos"),
          {
            description:
              "Click on the dropdown button beside the Hourly Forecast text",
            waitUntil: "a list of days is visible in the dropdown",
          },
        ],
        assertions: [
          {
            assertion: "You can see all seven days of the week in the dropdown",
          },
          {
            assertion:
              "Under Hourly Forecast you can see time slots like 12 AM, 1 AM, 2 AM with a temperature beside each",
          },
          {
            assertion:
              "Each hourly row shows a weather icon, a time, and a temperature value",
          },
        ],
        test,
        expect,
      });
    });

    test("Daily forecast navigation", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Validating the daily forecast section and navigation arrows",
        steps: [
          ...searchCity("Lagos"),
          { description: "Scroll down to see the Daily Forecast section" },
          {
            description:
              "Click the right arrow button to navigate forward in the daily forecast",
            waitUntil: "new forecast days are visible",
          },
        ],
        assertions: [
          {
            assertion:
              "You can see day names like Thu, Fri, Sat with high and low temperatures",
          },
          {
            assertion:
              "Each daily forecast card shows a weather icon and two temperature values",
          },
          {
            assertion:
              "The right arrow navigation moved the forecast forward showing new days",
          },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Theme", () => {
    test("Toggle dark and light mode", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Toggle between dark and light mode",
        steps: [
          ...searchCity("Lagos"),
          {
            description: "Click the moon icon button at the top right",
            waitUntil: "the page theme changes",
          },
        ],
        assertions: [
          { assertion: "The page background is now light instead of dark" },
          { assertion: "The moon icon has changed to a sun icon" },
        ],
        test,
        expect,
      });
    });
  });
});
