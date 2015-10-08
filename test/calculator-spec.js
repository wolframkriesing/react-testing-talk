import React from 'react';
import assert from 'assert';

describe('calculator example', function() {

  it('initially the screen is empty', function() {
    let calculator = (
      <div>
        <div></div>
        <button>1</button>
      </div>
    );
    
    // render the calculator
    
    const screenContent = null;
    assert.equal(screenContent, '');
  });
  
});