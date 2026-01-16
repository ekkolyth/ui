import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { Button } from './index';

vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

describe('Button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render with different variants', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outline');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should trigger toast on click', async () => {
    const user = userEvent.setup();
    render(
      <Button onClick={() => toast('Achievement Unlocked! Clicked the button 50G')}>
        Click me
      </Button>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(toast).toHaveBeenCalledWith('Achievement Unlocked! Clicked the button 50G');
  });
});