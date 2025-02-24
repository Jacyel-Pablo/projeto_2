import { test, expect } from '@playwright/test';

test('Pagína de dados__filme', async ({ page }) => {
  await page.goto('http://localhost:5173/dados__filme.html');
  await expect(page.getByRole('img', { name: 'Perfil' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'ShowTime' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Poster do filme' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sinopse' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'estrela' })).toBeVisible();
  await expect(page.locator(' p[ id="avalia" ] ')).toBeVisible();
  await expect(page.locator('._comentarios_usuarios_l8jlb_145')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Faça um comentario' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enviar' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Faça um comentario' }).fill('testando123');
  await page.getByRole('button', { name: 'Enviar' }).click();
});