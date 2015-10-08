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
      const click = (number) => {
        let newScreen = this.state.screen || '';
        this.setState({screen: newScreen + number});
      };
      return (
        <div>
          <div>{this.state.screen}</div>
          <button onClick={click.bind(null, 1)}>1</button>
          <button onClick={click.bind(null, 2)}>2</button>
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

  function clickButton(rendered, which=1) {
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button');
    const buttonNode = ReactDOM.findDOMNode(buttons[which-1]);
    TestUtils.Simulate.click(buttonNode);
  }
  
  it('a click on 1 renders 1 onto the screen', function() {
    const rendered = TestUtils.renderIntoDocument(<Calculator />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'div');
    clickButton(rendered);
    
    const screenContent = divs[1].innerHTML;
    assert.equal(screenContent, '1');
  });

  it('a click on 1 and 2 renders 12 onto the screen', function() {
    const rendered = TestUtils.renderIntoDocument(<Calculator />);
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'div');
    clickButton(rendered, 1);
    clickButton(rendered, 2);
    
    const screenContent = divs[1].innerHTML;
    assert.equal(screenContent, '12');
  });
  
});