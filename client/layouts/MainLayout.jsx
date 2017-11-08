import React from 'react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
      <h2> PadTube </h2>
      <nav>
        <a href = "/"> Notes </a>
        <a href = "/about"> About </a>
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
)