import React from 'react';
import './style.less';
import './img/thumbnail-small-1.png';
import './img/thumbnail-small-2.png';
import './img/thumbnail-small-3.png';
import './img/thumbnail-small-4.png';
import './img/thumbnail-small-5.png';
import './img/thumbnail-small-6.png';
import './img/thumbnail-small-7.png';
import './img/thumbnail-small-8.png';
import './img/thumbnail-small-9.png';

import action, { ACTIONS } from '../../action/action.js';

export default class NavMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      searchText: '',
    };
  }

  componentDidMount() {
    this._cancelSearch = action
    .filter(action => action.name === ACTIONS.OPEN_NAV_MENU)
    .subscribe(() => {
      this.setState({ searchText: '' });
    });
  }

  componentWillUnmount() {
    this._cancelSearch.dispose();
  }

  render() {
    return (
      <div id="nav-menu">
        <div id="search-bar">
          <div id="search-content">
            <button><i className="fa fa-search"></i></button>
            <input onFocus={() => action.onNext({ name: ACTIONS.FULL_NAV_MENU })}
              onChange={e => this.setState({ searchText: e.target.value })}
              value={this.state.searchText}
              type="search" placeholder="Search by username…" />
          </div>
          <div id="cancel-button" onClick={() => action.onNext({ name: ACTIONS.OPEN_NAV_MENU })}>Cancel</div>
        </div>
        <div id="user-list">

          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
            return (
              <div key={i} className="user-item">
                <div className="user-avatar" style={{ backgroundImage: `url('/assets/thumbnail-small-${i}.png')` }}></div>
                <div className="user-info">
                  <div className="fullname">Jon Bryan</div>
                  <div className="username">jb2nite</div>
                </div>
              </div>
            );
          })}

          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
            return (
              <div key={i} className="user-item">
                <div className="user-avatar" style={{ backgroundImage: `url('/assets/thumbnail-small-${i}.png')` }}></div>
                <div className="user-info">
                  <div className="fullname">Jon Bryan</div>
                  <div className="username">jb2nite</div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    );
  }
}
