import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import assert from 'assert';

import './setup-jsdom';

describe('calculator example', function() {

  class Calculator extends React.Component {
    constructor() {
      super();
      this.state = {screen: 0};
    }
    render() { 
      const click = () => this.setState({screen: 1});
      return (
        <div>
          <div>{this.state.screen}</div>
          <button onClick={click}>1</button>
        </div>
      )
    }
  }
  
  it('initially the screen is empty', function() {
    const rendered = TestUtils.renderIntoDocument(<Calculator />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'div');
    
    const screenContent = divs[1].innerHTML;
    assert.equal(screenContent, '0');
  });

  it('a click on 1 renders 1 onto the screen', function() {

    function clickButton(rendered) {
      const button = TestUtils.findRenderedDOMComponentWithTag(rendered, 'button');
      const buttonNode = ReactDOM.findDOMNode(button);
      TestUtils.Simulate.click(buttonNode);
    }
    
    const rendered = TestUtils.renderIntoDocument(<Calculator />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'div');
    clickButton(rendered);
    
    const screenContent = divs[1].innerHTML;
    assert.equal(screenContent, '1');
  });
  
});