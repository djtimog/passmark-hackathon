import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

const BASE_URL = "https://chef-claude-one.vercel.app/";
const TIMEOUT = 150_000;

const addIngredient = (ingredient: string) => [
  {
    description: `Type ${ingredient} in the ingredient input`,
    data: { value: ingredient },
  },
  { description: "Click the Add Ingredient button" },
];

const fourIngredients = [
  ...addIngredient("Mango"),
  ...addIngredient("Avocado"),
  ...addIngredient("Flour"),
  ...addIngredient("Sugar"),
];

test.describe("Chef Claude App", () => {
  test.describe("Empty State", () => {
    test("Shows 'No ingredients added yet' on load", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Shows 'No ingredients added yet' on load",
        steps: [{ description: `Navigate to ${BASE_URL}` }],
        assertions: [
          {
            assertion:
              "You can see the website name Chef Claude with a robot image with a background of yellow",
          },
          { assertion: "You can see the message 'No ingredients added yet'" },
          {
            assertion:
              "You can see the message 'Enter the ingredients you have, and let ai suggest recipes'",
          },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Adding Ingredients", () => {
    test("Add one ingredient - appears in list", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Add one ingredient...",
        steps: [
          { description: `Navigate to ${BASE_URL}` },
          ...addIngredient("Mango"),
        ],
        assertions: [
          {
            assertion:
              "You can see the ingredient 'Mango' appears in the ingredient list",
          },
        ],
        test,
        expect,
      });
    });

    test("Add duplicate ingredient - shows alert", async ({ page }) => {
      test.setTimeout(TIMEOUT);

      let alertMessage = "";
      page.on("dialog", async (dialog) => {
        alertMessage = dialog.message();
        await dialog.accept();
      });

      await runSteps({
        page,
        userFlow: "Add duplicate ingredient - shows alert",
        steps: [
          { description: `Navigate to ${BASE_URL}` },
          ...addIngredient("Mango"),
          ...addIngredient("Mango"),
        ],
        assertions: [
          { assertion: "You can see only one Mango in the ingredient list" },
        ],
        test,
        expect,
      });

      expect(alertMessage).toContain("already in the ingredient list");
    });

    test("Add 3 ingredients - Ask AI button not visible", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Add 3 ingredients - Ask AI button not visible",
        steps: [
          { description: `Navigate to ${BASE_URL}` },
          ...addIngredient("Mango"),
          ...addIngredient("Avocado"),
          ...addIngredient("Flour"),
        ],
        assertions: [
          {
            assertion:
              "You can see the ingredients 'Mango', 'Avocado', and 'Flour' appear in the ingredient list",
          },
          {
            assertion: "You do NOT see the 'Ask AI' button",
          },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("Removing Ingredients", () => {
    test("Click Remove - ingredient disappears", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "add Mango, remove it, assert gone",
        steps: [
          { description: `Navigate to ${BASE_URL}` },
          ...addIngredient("Mango"),
          {
            description: "Click the Remove button beside Mango",
            waitUntil: "Mango disappears from the ingredient list",
          },
        ],
        assertions: [
          { assertion: "You do NOT see Mango in the ingredient list" },
          { assertion: "You can see the message No ingredients added yet" },
        ],
        test,
        expect,
      });
    });
  });

  test.describe("AI Recipe Generation", () => {
    test("Add 4 ingredients - Ask AI button appears", async ({ page }) => {
      test.setTimeout(TIMEOUT);
      await runSteps({
        page,
        userFlow: "Add 4 ingredients - Ask AI button appears",
        steps: [{ description: `Navigate to ${BASE_URL}` }, ...fourIngredients],
        assertions: [
          {
            assertion:
              "You can see the ingredients 'Mango', 'Avocado', 'Flour', and 'Sugar' appear in the ingredient list",
          },
          {
            assertion: "You can see the 'Ask AI' button",
          },
        ],
        test,
        expect,
      });
    });

    test("Click Ask AI - recipe suggestions appear", async ({ page }) => {
      test.setTimeout(360_000);
      await runSteps({
        page,
        userFlow: "Click Ask AI and wait for recipe suggestions",
        steps: [
          { description: `Navigate to ${BASE_URL}` },
          ...fourIngredients,
          { description: "Scroll down until the Ask AI button is visible" },
          { description: "Click the Ask AI button" },
          { description: "Wait 30 seconds for the AI to generate recipes" },
        ],
        assertions: [
          { assertion: "You can see a heading that says Recipes on the page" },
          {
            assertion:
              "You can see at least one recipe suggestion button on the page",
          },
        ],
        test,
        expect,
      });
    });

    test("Click a suggestion - recipe details change", async ({ page }) => {
      test.setTimeout(360_000);
      await runSteps({
        page,
        userFlow: "Click a suggestion - recipe details change",
        steps: [
          { description: `Navigate to ${BASE_URL}` },
          ...fourIngredients,
          {
            description: "Scroll down to see the Ask AI button",
          },
          {
            description: "Click the Ask AI button",
          },
          {
            description: "Wait for the page to load the recipe suggestions",
            waitUntil:
              "three recipe suggestion buttons are visible on the page",
          },
          { description: "Click the second recipe suggestion" },
        ],
        assertions: [
          {
            assertion:
              "You can see the recipe details (title, description, ingredients and instructions) update to match the selected recipe suggestion",
          },
        ],
        test,
        expect,
      });
    });
  });
});
