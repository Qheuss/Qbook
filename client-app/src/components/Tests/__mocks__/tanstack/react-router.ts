import { vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual = await importOriginal<
    typeof import('@tanstack/react-router')
  >();
  return {
    ...actual,
    useRouter: () => ({
      navigate: mockNavigate,
    }),
  };
});

export { mockNavigate };
