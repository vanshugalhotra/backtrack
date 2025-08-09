import { render, screen, fireEvent } from '@testing-library/react';
import TestCard from '@/components/ui/TestCard';

describe('TestCard', () => {
  const mockClick = jest.fn();
  const props = {
    name: 'Reverse Engineering Challenge',
    description: 'Break the binary to find the hidden flag.',
    image: '/images/test-banner.png',
    onClick: mockClick,
  };

  it('renders name and description', () => {
    render(<TestCard {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  it('calls onClick when the card is clicked', () => {
    render(<TestCard {...props} />);
    fireEvent.click(screen.getByRole('button', { name: /enter test/i }));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger card click when button is clicked', () => {
    const cardClick = jest.fn();
    render(<TestCard {...props} onClick={cardClick} />);
    fireEvent.click(screen.getByRole('button', { name: /enter test/i }));
    expect(cardClick).toHaveBeenCalledTimes(1);
  });
});
