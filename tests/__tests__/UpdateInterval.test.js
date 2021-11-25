import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateInterval from '../../src/components/Globals/UpdateInterval';
import { GlobalProvider } from '../../src/context/Provider';

describe('testing functionality of Upload Interval component', () => {
	beforeEach(() =>
		render(
			<GlobalProvider>
				<UpdateInterval />
			</GlobalProvider>
		)
	);
	afterEach(cleanup);

	it('should have an input field for updating interval', () => {
		const inputElement = document.querySelector('#intervalInput');
		expect(inputElement).toBeInTheDocument();
		fireEvent.change(inputElement, { target: { value: 10 } });
		expect(inputElement.value).toBe('10');
	});

	it('should have a update button', () => {
		const buttonElement = screen.getByText(/Update frequency/i);
		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement).toContainHTML('input');
	});
});
