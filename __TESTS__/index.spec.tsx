import { render, screen } from '@testing-library/react';

import { queryClientWrapper } from '@/__TESTS__/queryClientWrapper.fixture';
import Home from '@/src/pages';

describe('Home', () => {
	test('renders a heading', () => {
		render(<Home />, { wrapper: queryClientWrapper() });

		const heading = screen.getByRole('heading', {
			name: /welcome to next\.js!/i,
		});

		expect(heading).toBeInTheDocument();
	});
});
