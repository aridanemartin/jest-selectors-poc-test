import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComplexNestedComponent } from './ComplexNestedComponent';

// Mock data for testing
const mockItems = Array.from({ length: 100 }, (_, index) => ({
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
  const ITERATIONS = 150; // Número de iteraciones para promediar resultados
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
    
    // Realizar múltiples mediciones
    for (let i = 0; i < ITERATIONS; i++) {
      const time = measureTime(callback);
      times.push(time);
    }

    // Calcular estadísticas
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
      // Buscar el botón "View Details" del primer ítem
      screen.getByRole('button', { name: 'View details for Item 1' });
    });
  });

  it('should measure getByLabelText performance', () => {
    runPerformanceTest('getByLabelText', () => {
      // Buscar el botón "Edit" del primer ítem
      screen.getByLabelText('Edit Item 1');
    });
  });

  it('should measure getByPlaceholderText performance', () => {
    runPerformanceTest('getByPlaceholderText', () => {
      // Buscar el input de búsqueda
      screen.getByPlaceholderText('Type to search...');
    });
  });

  it('should measure getByText performance', () => {
    runPerformanceTest('getByText', () => {
      // Buscar el título del primer ítem
      screen.getByText('Item 1');
    });
  });

  it('should measure getByAltText performance', () => {
    runPerformanceTest('getByAltText', () => {
      // Buscar la imagen del primer ítem
      screen.getByAltText('Image for Item 1');
    });
  });

  it('should measure getByTitle performance', () => {
    runPerformanceTest('getByTitle', () => {
      // Buscar la imagen del primer ítem por su título
      screen.getByTitle('Item 1 image');
    });
  });

  it('should measure getByTestId performance', () => {
    runPerformanceTest('getByTestId', () => {
      // Buscar el primer tag del primer ítem
      screen.getByTestId('tag-1-0');
    });
  });

  it('should log performance results', () => {
    // Ordenar resultados por tiempo promedio (ascendente)
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

    // Verificar que todos los selectores encontraron sus elementos
    expect(performanceResults.length).toBe(7);
  });
}); 