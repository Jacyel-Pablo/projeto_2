import { test, expect } from '@playwright/test';

test('Pagína de ajudar', async ({ page }) => {
  await page.goto('http://localhost:5173/ajudar');
  await expect(page.getByText('Coloque o diretorioda da capa:ㅤColoque o nome do filme:Coloque a sinopse do')).toBeVisible();
  await expect(page.getByText('Coloque o diretorioda da capa:')).toBeVisible();
  await expect(page.locator('#capa')).toBeVisible();
  await expect(page.getByRole('img')).toBeVisible();
  await expect(page.getByText('Coloque o nome do filme:')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Insira o nome do filme' })).toBeVisible();
  await expect(page.getByText('Coloque a sinopse do filme:')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Insira a sinopse do filme' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enviar' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Insira o nome do filme' }).fill('Testando');
  await page.getByRole('textbox', { name: 'Insira a sinopse do filme' }).fill('Esse é um teste do campo de sinopse');
  await page.getByRole('button', { name: 'Enviar' }).click();
});