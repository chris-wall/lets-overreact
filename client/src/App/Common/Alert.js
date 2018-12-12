import React from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import './Alert.css';

/**
 * mapStateToProps is a function used by the connect middleware.
 * @param {Map} state - State from the Redux store.
 */
const mapStateToProps = (state = Map()) => ({
  alert: state.get('alert')
});

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  componentDidMount() {
    const { alert = {} } = this.props;
    this.setState({ lastKey: alert.key, show: (alert.key !== undefined) });
  }

  componentWillReceiveProps(nextProps) {
    const { alert = {} } = nextProps;

    if (alert.key !== undefined && alert.key !== this.state.lastKey) {
      this.setState({ lastKey: alert.key, show: true }, () => {
        setTimeout(() => this.setState({ show: false }), 4000);
      });
    }
  }

  render() {
    const { show = false } = this.state;
    const { alert = {} } = this.props;

    return   (<div className="alert">
      <div className={`alert__content alert-${alert.type} ${show === true ? 'show' :  show === false ? 'hide' : ''}`}>
        <i className="material-icons">{(alert.type === 'error' ? 'error_outline' : 'check_circle_outline')}</i>
        <span>{alert.message}</span>
      </div>
    </div>);
  }
}

export default connect(mapStateToProps)(Alert);
