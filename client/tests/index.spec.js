import { test, expect } from '@playwright/test';

test('Pagína de index', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByText('Email')).toBeVisible();
  await expect(page.getByText('Password')).toBeVisible();
  await expect(page.getByText('Não possui uma conta crie uma')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  await page.locator('#email').fill('testando123@gmail.com');
  await page.locator('#senha').fill('123');
});