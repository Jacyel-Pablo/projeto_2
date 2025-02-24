import { test, expect } from '@playwright/test';

test('pagina de arquivo nao encontrado', async ({ page }) => {
  await page.goto('http://localhost:5173/erro');
  await expect(page.getByRole('heading', { name: 'Ei rapaz oque você está' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Personagem Akko' })).toBeVisible();
});