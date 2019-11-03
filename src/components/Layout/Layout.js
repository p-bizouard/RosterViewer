/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { connect } from 'react-redux';
import { setRosterKey } from '../../actions/roster';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.less';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    if (this.props.params.rosterKey)
      this.props.setRosterKey(this.props.params.rosterKey);

    return (
      <div>
        <Header client={this.props.client} history={this.props.history} />
        {this.props.children}
        <Feedback />
        <Footer />
      </div>
    );
  }
}

const mapState = state => ({
  rosterKey: state.runtime.rosterKey,
});

const mapDispatch = {
  setRosterKey,
};
export default connect(mapState, mapDispatch)(
  withStyles(normalizeCss, s)(Layout),
);
