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

  describe('using jsdom', function() {

    let rendered, divs;
    beforeEach(function() {
      rendered = TestUtils.renderIntoDocument(<Calculator />);
      divs = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'div');
    });
    
    function clickButton(which = 1) {
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button');
      const buttonNode = ReactDOM.findDOMNode(buttons[which - 1]);
      TestUtils.Simulate.click(buttonNode);
    }

    it('initially the screen is empty', function() {
      const screenContent = divs[1].innerHTML;
      assert.equal(screenContent, '0');
    });

    it('a click on 1 renders 1 onto the screen', function() {
      clickButton(1);

      const screenContent = divs[1].innerHTML;
      assert.equal(screenContent, '1');
    });

    it('a click on 1 and 2 renders 12 onto the screen', function() {
      clickButton(1);
      clickButton(2);

      const screenContent = divs[1].innerHTML;
      assert.equal(screenContent, '12');
    });
    
  });

  describe('using shallow renderer', function() {

    let renderer, rendered, screen;
    beforeEach(function() {
      renderer = TestUtils.createRenderer();
      renderer.render(<Calculator />);
      rendered = renderer.getRenderOutput();
      screen = rendered.props.children[0].props.children;
    });

    function clickButton(which = 1) {
      const buttonNode = rendered.props.children[which];
      buttonNode.props.onClick();
      rendered = renderer.getRenderOutput();
      screen = rendered.props.children[0].props.children;
    }

    it('initially the screen is empty', function() {
      assert.equal(screen, '0');
    });
    
    it('a click on 1 renders 1 onto the screen', function() {
      clickButton(1);
      assert.equal(screen, '1');
    });
    
    it('a click on 1+2 renders 12 onto the screen', function() {
      clickButton(1);
      clickButton(2);
      assert.equal(screen, '12');
    });
    
  });
  
});