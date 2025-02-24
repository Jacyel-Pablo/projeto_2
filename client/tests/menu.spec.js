import { test, expect } from '@playwright/test';

test('Pagína de menu', async ({ page }) => {
  await page.goto('http://localhost:5173/menu.html');
  await expect(page.getByText('Nome do filme').first()).toBeVisible();
  await expect(page.getByText('Nome do filme').nth(1)).toBeVisible();
  await expect(page.getByText('Nome do filme').nth(2)).toBeVisible();
  await expect(page.getByText('Nome do filme').nth(3)).toBeVisible();
  await expect(page.locator('a').filter({ hasText: 'ShowTime' })).toBeVisible();

  await page.locator( 'input[ id="pesquisa" ]').fill('poke');
  await page.getByRole('img', { name: 'Perfil' }).click();
});