import { expect, test, type Page, type TestInfo } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(overflows).toBe(false);
}

async function capture(page: Page, testInfo: TestInfo, name: string) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await expectNoHorizontalOverflow(page);
  await page.screenshot({
    path: testInfo.outputPath(`${name}.png`),
    fullPage: true,
  });
}

test("canonical judge journey works end to end", async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");
  await expect(page).toHaveTitle(/AstroLive Compass/);
  await expect(page.getByRole("heading", { name: "Plan with the day, not against it." })).toBeVisible();
  await capture(page, testInfo, "01-landing");

  await page.getByRole("link", { name: "Try the demo", exact: false }).first().click();
  await expect(page).toHaveURL(/\/onboarding$/);
  await expect(page.getByRole("heading", { name: /A small amount of context/ })).toBeVisible();

  await page.getByRole("button", { name: "Use demo profile" }).click();
  await expect(page).toHaveURL(/\/today$/);
  await expect(page.getByRole("heading", { name: /Aarav/ })).toBeVisible();
  await expect(page.getByText("A better day for clarity than speed.")).toBeVisible();
  await capture(page, testInfo, "02-today");

  await page.getByRole("link", { name: "Plan a moment", exact: false }).first().click();
  await expect(page).toHaveURL(/\/plan$/);
  await page.getByRole("button", { name: /Difficult conversation/ }).click();
  await page.getByLabel("Moment title").fill("Talk with Mira about moving cities");
  await page.getByRole("button", { name: "Important", exact: true }).click();
  await page.getByRole("button", { name: "Generate my Compass", exact: false }).click();

  await expect(page.getByText("Choose clarity over winning the conversation.")).toBeVisible();
  await expect(page.getByText("6:10 PM – 7:30 PM")).toBeVisible();
  await capture(page, testInfo, "03-plan-result");

  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("button", { name: /Saved/ })).toBeVisible();
  await page.getByRole("button", { name: "Add someone", exact: true }).click();
  await page.getByLabel("Their first name").fill("Mira");
  await page.getByRole("button", { name: "Create shared moment", exact: false }).click();

  await expect(page).toHaveURL(/\/together\//);
  await expect(page.getByRole("heading", { name: "Aarav + Mira" })).toBeVisible();
  await expect(page.getByText("6:20 PM – 7:20 PM")).toBeVisible();
  await capture(page, testInfo, "04-shared-moment");

  await page.getByRole("link", { name: "Ask an expert", exact: true }).click();
  await expect(page).toHaveURL(/\/experts\?/);
  await expect(page.getByRole("heading", { name: "When the moment matters, hand it to a human." })).toBeVisible();
  await expect(page.getByText("Talk with Mira about moving cities", { exact: true })).toBeVisible();
  await expect(page.getByText("Sample profile").first()).toBeVisible();
  await capture(page, testInfo, "05-expert-handoff");

  expect(consoleErrors, `Browser console errors: ${consoleErrors.join(" | ")}`).toEqual([]);
  expect(pageErrors, `Unhandled page errors: ${pageErrors.join(" | ")}`).toEqual([]);
});
