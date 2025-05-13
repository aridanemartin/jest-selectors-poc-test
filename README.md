# React Testing Library Selectors Performance POC

This repository contains a Proof of Concept (POC) that demonstrates and compares the performance of different selectors available in React Testing Library. The POC uses a complex nested component to effectively showcase the performance characteristics of each selector type.

## Purpose

The main goal of this POC is to:
- Measure and compare the performance of different React Testing Library selectors
- Demonstrate how selector choice can impact test performance
- Provide insights into which selectors are most efficient for different scenarios
- Help developers make informed decisions when choosing selectors for their tests

## Selectors Tested

The POC measures the performance of the following selectors:
- `getByRole`
- `getByLabelText`
- `getByPlaceholderText`
- `getByText`
- `getByAltText`
- `getByTitle`
- `getByTestId`

## Performance Results

Based on our tests with 150 iterations per selector, here are the average performance results (from fastest to slowest):

1. `getByAltText`: ~1.4ms
2. `getByPlaceholderText`: ~1.7ms
3. `getByTitle`: ~1.7ms
4. `getByTestId`: ~2.2ms
5. `getByLabelText`: ~8.8ms
6. `getByText`: ~10.9ms
7. `getByRole`: ~50ms

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd react-testing-library-poc
```

2. Install dependencies:
```bash
npm install
```

3. Run the tests:
```bash
npm test
```

## Project Structure

```
src/
  ├── components/
  │   ├── ComplexNestedComponent.tsx    # The component used for testing
  │   └── ComplexNestedComponent.test.tsx # Performance tests
  └── test/
      └── setup.ts                      # Test setup configuration
```

## Testing Methodology

The performance tests:
- Run 150 iterations per selector
- Measure execution time using `performance.now()`
- Calculate statistics including average, min, max, and standard deviation
- Search for elements within the same nested component for fair comparison

## Best Practices

Based on the performance results, here are some recommendations:

1. Use `getByTestId` for elements that are frequently accessed and performance-critical
2. Prefer `getByRole` for accessibility-focused testing, but be aware of its performance impact
3. Use `getByText` and `getByLabelText` when semantic meaning is important
4. Consider using `getByAltText` or `getByTitle` for image-related elements

## Documentation References

### React Testing Library
- [Official Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Queries Documentation](https://testing-library.com/docs/queries/about)
- [Best Practices](https://testing-library.com/docs/guiding-principles)

### Jest
- [Official Documentation](https://jestjs.io/docs/getting-started)
- [Performance Tips](https://jestjs.io/docs/troubleshooting#tests-are-extremely-slow-on-docker-and-or-continuous-integration-ci-server)

### Vitest
- [Official Documentation](https://vitest.dev/guide/)
- [Performance Configuration](https://vitest.dev/config/#performance)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
