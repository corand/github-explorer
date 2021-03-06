import React from 'react';
import './style.less';

export default (props) => (
  <div id="search-input">
    <button
      className={!props.buttonText ? 'icon' : null}
      onClick={props.onSearch}
    >
      {props.buttonText ?
        props.buttonText :
        <i className="fa fa-search"></i>
      }
    </button>
    <input
      aria-label="Search"
      {...props}
      type="search"
    />
  </div>
);
