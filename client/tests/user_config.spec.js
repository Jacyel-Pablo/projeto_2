// import { test, expect } from '@playwright/test';

// test('User_config', async ({ page }) => {
//   await page.goto('http://localhost:5173/user__config.html');
//   await expect(page.getByRole('link', { name: 'A seta para voltar a pagína' })).toBeVisible();
//   await expect(page.getByRole('heading', { name: 'JacyelGamer2' })).toBeVisible();
//   await expect(page.locator('#input_alterar_nome')).toBeVisible();
//   await expect(page.locator('#lapis')).toBeVisible();
//   await expect(page.getByRole('link', { name: 'Você pode nos ajudar a' })).toBeVisible();
//   await expect(page.getByRole('button', { name: 'Sair da conta' })).toBeVisible();

//   await page.locator('#lapis').click();
//   await page.locator('#input_alterar_nome').fill('JacyelGamer3');
//   await page.locator('#lapis').click();
//   await page.getByRole('button', { name: 'Sair da conta' }).click();
// });