import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import assert from 'assert';

import './setup-jsdom';

describe('calculator example', function() {

  it('initially the screen is empty', function() {
    class Calculator extends React.Component { 
      render() { 
        return (
          <div>
            <div>0</div>
            <button>1</button>
          </div>
        )
      }
    }

    const rendered = TestUtils.renderIntoDocument(<Calculator />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'div');
    
    const screenContent = divs[1].innerHTML;
    assert.equal(screenContent, '0');
  });
  
});