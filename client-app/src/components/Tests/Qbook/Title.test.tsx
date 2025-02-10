import { mockNavigate } from '../__mocks__/react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../../context/ThemeProvider';
import '@testing-library/jest-dom';
import Title from '../../Qbook/Title';

// Reset mocks before each test
beforeEach(() => {
  mockNavigate.mockReset();
});

describe('Title', () => {
  const renderComponent = () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Title />
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  test('Check the social buttons redirections', async () => {
    const openUrl = vi.fn();
    global.open = openUrl;

    renderComponent();

    const buttonLinkedin = screen.getByText(/Linkedin/i);
    const buttonGithub = screen.getByText(/Github/i);

    expect(buttonLinkedin).toBeInTheDocument();
    expect(buttonGithub).toBeInTheDocument();

    // Click on the buttons
    await userEvent.click(buttonLinkedin);
    await userEvent.click(buttonGithub);

    // Check that openUrl URLs
    expect(openUrl).toHaveBeenCalledWith(
      'https://www.linkedin.com/in/quentin-heusse'
    );
    expect(openUrl).toHaveBeenCalledWith('https://github.com/Qheuss');

    // Check the number of times openUrl was called
    expect(openUrl).toHaveBeenCalledTimes(2);
  });

  test('Check if the dialog shows up', async () => {
    renderComponent();

    // Get the button and click on it
    const buttonPortfolio = screen.getByText(/Quentin Heusse/i);
    expect(buttonPortfolio).toBeInTheDocument();
    await userEvent.click(buttonPortfolio);

    // Check if the dialog appeared
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Check if the dialog disappears when the escape key is pressed
    await userEvent.keyboard('{Escape}');
    expect(dialog).not.toBeInTheDocument();

    // Check if the dialog appears again when the button is clicked again
    await userEvent.click(buttonPortfolio);
    const dialog2 = screen.getByRole('dialog');
    expect(dialog2).toBeInTheDocument();

    // Check if the dialog disappears when the enter key is pressed
    await userEvent.keyboard('{Enter}');
    expect(dialog2).not.toBeInTheDocument();
    console.log('Mock Navigate Function:', mockNavigate);

    expect(mockNavigate).toHaveBeenCalledWith('/message');
  });
});
