import React from 'react';
import ReactDom from 'react-dom';
import './style.less';

export default class PageTransition extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      child1: this.props.children,
      child2: null,
      nextChild: 2,
    };
  }

  componentDidMount() {
    const child = this.refs.child1;
    if (child) {
      const dom = ReactDom.findDOMNode(child);
      child.onTransitionDidEnd && child.onTransitionDidEnd(this.props.data);
      dom.classList.remove('transition-item');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children !== nextProps.children) {
      const previousPathname = this.props.children.props.location.pathname;
      this.state[`child${this.state.nextChild}`] = nextProps.children;
      this.forceUpdate(() => {
        const child = this.refs[`child${this.state.nextChild}`];
        const dom = ReactDom.findDOMNode(child);
        let timeout = 0;
        const att = dom.getAttribute('data-from-path');

        child.onTransitionWillStart && child.onTransitionWillStart(this.props.data);

        if (dom.classList.contains('transition-item') &&
            (att === null || att === previousPathname)) {
          dom.classList.add('transition-appear');
          setTimeout(() => {
            if (child.transitionManuallyStart) {
              child.transitionManuallyStart(this.props.data);
            } else {
              dom.classList.add('transition-appear-active');
            }
          }, 17);
          timeout = this.props.timeout || 500;
        }
        child.onTransitionDidStart && child.onTransitionDidStart(this.props.data);

        setTimeout(() => {
          this.state.nextChild = this.state.nextChild === 1 ? 2 : 1;
          this.state[`child${this.state.nextChild}`] = null;
          this.forceUpdate(() => {
            child.onTransitionWillEnd && child.onTransitionWillEnd(this.props.data);
            if (dom.classList.contains('transition-item')) {
              dom.classList.remove('transition-appear');
              dom.classList.remove('transition-item');

              if (child.transitionManuallyStop) {
                child.transitionManuallyStop(this.props.data);
              } else {
                dom.classList.remove('transition-appear-active');
              }
            }
            this.props.onLoad();
            child.onTransitionDidEnd && child.onTransitionDidEnd(this.props.data);
          });
        }, timeout);
      });
    }
  }

  render() {
    return (
      <div className="trasition-wrapper">
        {React.Children.map(this.state.child1, element =>
          React.cloneElement(element, { ref: 'child1' })
        )}
        {React.Children.map(this.state.child2, element =>
          React.cloneElement(element, { ref: 'child2' })
        )}
      </div>
    );
  }
}
