import { test, expect } from '@playwright/test';

test('Pagína de criar conta', async ({ page }) => {
  await page.goto('http://localhost:5173/criar_conta.html');
  await expect(page.getByRole('heading', { name: 'Criar conta' })).toBeVisible();
  await expect(page.getByText('Apelido:')).toBeVisible();
  await expect(page.getByText('Email:')).toBeVisible();
  await expect(page.getByText('Password:')).toBeVisible();
  await page.locator('#apelido').click();
  await page.locator('#apelido').fill('JacyelGamer2');

  await page.locator('#email').fill('testando123@gmail.com');
  await page.locator('#senha').fill('123');
  await page.getByRole('button', { name: 'Criar' }).click();
});