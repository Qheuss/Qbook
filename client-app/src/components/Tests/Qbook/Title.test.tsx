import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Title from '../../Qbook/Title';
import { expect, test, vi } from 'vitest';

test('renders button with text and handles click', async () => {
  const handleClick = vi.fn();
  render(<Title />);

  const button = screen.getByText(/click me/i);
  // expect(button).toBeInTheDocument();

  await userEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
