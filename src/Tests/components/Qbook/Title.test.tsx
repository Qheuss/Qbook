import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import '@testing-library/jest-dom';
import { routeTree } from '../../../routeTree.gen';
import { mockNavigate } from '../../__mocks__/tanstack/react-router';
import { ThemeProvider } from '../../../ThemeProvider';
import Title from '../../../components/Qbook/Title';

const router = createRouter({ routeTree });

beforeEach(() => {
  mockNavigate.mockReset();
});

describe('Title', () => {
  const renderComponent = () => {
    render(
      <ThemeProvider>
        <RouterProvider router={router} />
        <Title />
      </ThemeProvider>
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

    await userEvent.click(buttonLinkedin);
    await userEvent.click(buttonGithub);

    expect(openUrl).toHaveBeenCalledWith(
      'https://www.linkedin.com/in/quentin-heusse'
    );
    expect(openUrl).toHaveBeenCalledWith('https://github.com/Qheuss');

    expect(openUrl).toHaveBeenCalledTimes(2);
  });

  test('Check if the dialog shows up', async () => {
    renderComponent();

    const buttonPortfolio = screen.getByText(/Cliquez ici pour me contacter!/i);
    expect(buttonPortfolio).toBeInTheDocument();
    await userEvent.click(buttonPortfolio);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(dialog).not.toBeInTheDocument();

    await userEvent.click(buttonPortfolio);
    const dialog2 = screen.getByRole('dialog');
    expect(dialog2).toBeInTheDocument();

    await userEvent.keyboard('{Enter}');
    expect(dialog2).not.toBeInTheDocument();

    expect(mockNavigate).toHaveBeenCalledWith('/contact');
  });
});
