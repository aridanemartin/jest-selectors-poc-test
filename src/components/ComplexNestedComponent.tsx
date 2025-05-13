import React from 'react';

interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

interface ComplexNestedComponentProps {
  items: Item[];
}

export const ComplexNestedComponent: React.FC<ComplexNestedComponentProps> = ({ items }) => {
  return (
    <div className="complex-container" data-testid="complex-container">
      <header className="header">
        <h1 role="heading" aria-level={1}>Complex Nested Component</h1>
        <nav role="navigation">
          <ul>
            <li><a href="#section1">Section 1</a></li>
            <li><a href="#section2">Section 2</a></li>
          </ul>
        </nav>
      </header>

      <main role="main">
        <section id="section1" aria-labelledby="section1-title">
          <h2 id="section1-title" role="heading" aria-level={2}>Section 1</h2>
          <div className="items-grid">
            {items.map((item) => (
              <article key={item.id} className="item-card">
                <div className="item-header">
                  <img 
                    src={item.imageUrl} 
                    alt={`Image for ${item.title}`}
                    title={`${item.title} image`}
                  />
                  <h3 role="heading" aria-level={3}>{item.title}</h3>
                </div>
                <p>{item.description}</p>
                <div className="tags-container">
                  {item.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="tag"
                      data-testid={`tag-${item.id}-${index}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="item-actions">
                  <button 
                    aria-label={`View details for ${item.title}`}
                    onClick={() => console.log(`View ${item.id}`)}
                  >
                    View Details
                  </button>
                  <button 
                    aria-label={`Edit ${item.title}`}
                    onClick={() => console.log(`Edit ${item.id}`)}
                  >
                    Edit
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="section2" aria-labelledby="section2-title">
          <h2 id="section2-title" role="heading" aria-level={2}>Section 2</h2>
          <form role="form" aria-label="Search form">
            <div className="form-group">
              <label htmlFor="search">Search Items:</label>
              <input 
                type="text" 
                id="search" 
                placeholder="Type to search..."
                aria-label="Search items"
              />
            </div>
            <div className="form-group">
              <label htmlFor="filter">Filter by:</label>
              <select id="filter" aria-label="Filter items">
                <option value="all">All Items</option>
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
              </select>
            </div>
            <button type="submit" aria-label="Submit search">Search</button>
          </form>
        </section>
      </main>

      <footer role="contentinfo">
        <p>© 2024 Complex Nested Component Demo</p>
      </footer>
    </div>
  );
}; 