import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComplexNestedComponent } from './ComplexNestedComponent';

// Mock data for testing
const mockItems = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `Item ${index + 1}`,
  description: `Description for item ${index + 1}`,
  imageUrl: `https://example.com/image${index + 1}.jpg`,
  tags: ['tag1', 'tag2', 'tag3'],
}));

interface PerformanceStats {
  avg: number;
  min: number;
  max: number;
  stdDev: number;
}

interface PerformanceResult {
  selector: string;
  times: number[];
  stats: PerformanceStats;
}

describe('ComplexNestedComponent Performance Tests', () => {
  const ITERATIONS = 300; // Number of iterations for averaging results
  const performanceResults: PerformanceResult[] = [];

  beforeEach(() => {
    render(<ComplexNestedComponent items={mockItems} />);
  });

  const measureTime = (callback: () => void): number => {
    const startTime = performance.now();
    callback();
    const endTime = performance.now();
    return endTime - startTime;
  };

  const runPerformanceTest = (selector: string, callback: () => void) => {
    const times: number[] = [];
    
    // Perform multiple measurements
    for (let i = 0; i < ITERATIONS; i++) {
      const time = measureTime(callback);
      times.push(time);
    }

    // Calculate statistics
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    const stdDev = Math.sqrt(
      times.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / times.length
    );

    performanceResults.push({
      selector,
      times,
      stats: {
        avg,
        min,
        max,
        stdDev
      }
    });
  };

  it('should measure getByRole performance', () => {
    runPerformanceTest('getByRole', () => {
      // Find the View Details button by its role and name
      screen.getByRole('button', { name: 'View details for Item 1' });
    });
  });

  it('should measure getByLabelText performance', () => {
    runPerformanceTest('getByLabelText', () => {
      // Find the View Details button by its aria-label
      screen.getByLabelText('View details for Item 1');
    });
  });

  it('should measure getByPlaceholderText performance', () => {
    runPerformanceTest('getByPlaceholderText', () => {
      // Find the hidden input by its placeholder
      screen.getByPlaceholderText('View details for Item 1');
    });
  });

  it('should measure getByText performance', () => {
    runPerformanceTest('getByText', () => {
      // Find the View Details button by its text content
      screen.getByText('View details for Item 1');
    });
  });

  it('should measure getByAltText performance', () => {
    runPerformanceTest('getByAltText', () => {
      // Find the View Details button by its hidden image's alt text
      screen.getByAltText('View details for Item 1');
    });
  });

  it('should measure getByTitle performance', () => {
    runPerformanceTest('getByTitle', () => {
      // Find the View Details button by its title attribute
      screen.getByTitle('View details for Item 1');
    });
  });

  it('should measure getByTestId performance', () => {
    runPerformanceTest('getByTestId', () => {
      // Find the View Details button by its data-testid
      screen.getByTestId('view-details-1');
    });
  });

  it('should log performance results', () => {
    // Sort results by average time (ascending)
    performanceResults.sort((a, b) => a.stats.avg - b.stats.avg);
    
    console.log('\nPerformance Results (from fastest to slowest):');
    console.log('===============================================');
    performanceResults.forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.selector}:`);
      console.log(`   Average: ${result.stats.avg.toFixed(3)}ms`);
      console.log(`   Min: ${result.stats.min.toFixed(3)}ms`);
      console.log(`   Max: ${result.stats.max.toFixed(3)}ms`);
      console.log(`   Std Dev: ${result.stats.stdDev.toFixed(3)}ms`);
    });

    // Verify that all selectors found their elements
    expect(performanceResults.length).toBe(7);
  });
}); 