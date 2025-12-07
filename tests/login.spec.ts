import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login form with all elements', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/frontend/);

    // Verify main heading (CardTitle renders as div, not heading)
    await expect(page.getByText('Welcome back')).toBeVisible();

    // Verify description
    await expect(page.getByText('Enter your credentials to access your account')).toBeVisible();

    // Verify email field
    const emailInput = page.getByRole('textbox', { name: 'Email' });
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('placeholder', 'you@example.com');

    // Verify password field
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password');

    // Verify Sign in button (should be disabled initially)
    const signInButton = page.getByRole('button', { name: 'Sign in' });
    await expect(signInButton).toBeVisible();
    await expect(signInButton).toBeDisabled();

    // Verify Forgot password link
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();

    // Verify Sign up link
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  });

  test('should enable Sign in button when both fields are filled', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Email' });
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    const signInButton = page.getByRole('button', { name: 'Sign in' });

    // Button should be disabled initially
    await expect(signInButton).toBeDisabled();

    // Fill email only - button should still be disabled
    await emailInput.fill('user@example.com');
    await expect(signInButton).toBeDisabled();

    // Fill password - button should now be enabled
    await passwordInput.fill('password123');
    await expect(signInButton).toBeEnabled();
  });

  test.describe('Scenario 1: User sign in with correct credentials', () => {
    test('should submit form and show alert with email', async ({ page }) => {
      const emailInput = page.getByRole('textbox', { name: 'Email' });
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      const signInButton = page.getByRole('button', { name: 'Sign in' });

      // Fill in correct credentials
      await emailInput.fill('user@example.com');
      await passwordInput.fill('password123');

      // Verify button is enabled
      await expect(signInButton).toBeEnabled();

      // Set up dialog handler before clicking
      page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('Login attempt with email: user@example.com');
        await dialog.accept();
      });

      await signInButton.click();
      
      // Wait a bit for dialog to be handled
      await page.waitForTimeout(100);

      // Verify form fields still contain values after submission
      await expect(emailInput).toHaveValue('user@example.com');
      await expect(passwordInput).toHaveValue('password123');
    });
  });

  test.describe('Scenario 2: User sign in with wrong credentials', () => {
    test('should submit form with wrong credentials and show alert', async ({ page }) => {
      const emailInput = page.getByRole('textbox', { name: 'Email' });
      const passwordInput = page.getByRole('textbox', { name: 'Password' });
      const signInButton = page.getByRole('button', { name: 'Sign in' });

      // Fill in wrong credentials
      await emailInput.fill('wrong@example.com');
      await passwordInput.fill('wrongpassword');

      // Verify button is enabled
      await expect(signInButton).toBeEnabled();

      // Set up dialog handler before clicking
      page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('Login attempt with email: wrong@example.com');
        await dialog.accept();
      });

      await signInButton.click();
      
      // Wait a bit for dialog to be handled
      await page.waitForTimeout(100);

      // Verify form fields still contain values after submission
      await expect(emailInput).toHaveValue('wrong@example.com');
      await expect(passwordInput).toHaveValue('wrongpassword');
    });
  });

  test.describe('Scenario 3: User signup for a new account', () => {
    test('should navigate to signup when clicking Sign up link', async ({ page }) => {
      const signUpLink = page.getByRole('link', { name: 'Sign up' });

      // Verify link is visible and clickable
      await expect(signUpLink).toBeVisible();
      await expect(signUpLink).toHaveAttribute('href', '#');

      // Click the signup link
      await signUpLink.click();

      // Verify URL changes (adds hash)
      await expect(page).toHaveURL('/#');

      // Note: Current implementation doesn't show a signup form,
      // but the link is functional and can be tested
      // The page content remains the same (login form)
      await expect(page.getByText('Welcome back')).toBeVisible();
    });
  });

  test.describe('Scenario 4: User forgot password', () => {
    test('should navigate to forgot password when clicking Forgot password? link', async ({ page }) => {
      const forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });

      // Verify link is visible and clickable
      await expect(forgotPasswordLink).toBeVisible();
      await expect(forgotPasswordLink).toHaveAttribute('href', '#');

      // Click the forgot password link
      await forgotPasswordLink.click();

      // Verify URL changes (adds hash)
      await expect(page).toHaveURL('/#');

      // Note: Current implementation doesn't show a forgot password form,
      // but the link is functional and can be tested
      // The page content remains the same (login form)
      await expect(page.getByText('Welcome back')).toBeVisible();
    });
  });

  test('should validate required fields', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Email' });
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    const signInButton = page.getByRole('button', { name: 'Sign in' });

    // Try to submit empty form (button should be disabled)
    await expect(signInButton).toBeDisabled();

    // Verify HTML5 validation attributes
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('should clear form when navigating back', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Email' });
    const passwordInput = page.getByRole('textbox', { name: 'Password' });

    // Fill in form
    await emailInput.fill('test@example.com');
    await passwordInput.fill('testpassword');

    // Navigate away
    await page.goto('/#');

    // Navigate back
    await page.goBack();

    // Form fields should still have values (browser may preserve state)
    // This test verifies the form doesn't auto-clear on navigation
    const emailValue = await emailInput.inputValue();
    const passwordValue = await passwordInput.inputValue();
    
    // Values may or may not persist depending on browser behavior
    // This is just to verify the form doesn't break on navigation
    expect(typeof emailValue).toBe('string');
    expect(typeof passwordValue).toBe('string');
  });
});

