import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DcaSimulator from './DcaSimulator';

describe('DcaSimulator', () => {
  test('renders DcaForm, DcaChart, and DcaTable components', async () => {
    const callServiceHandlerMock = jest.fn();
    render(<DcaSimulator callServiceHandler={callServiceHandlerMock} />);

    // Expect DcaChart to be initially hidden
    const dcaChartElement = screen.queryByTestId('dca-chart');
    expect(dcaChartElement).not.toBeInTheDocument();

    // Expect DcaTable to be initially hidden
    const dcaTableElement = screen.queryByTestId('dca-table');
    expect(dcaTableElement).not.toBeInTheDocument();

  });
});