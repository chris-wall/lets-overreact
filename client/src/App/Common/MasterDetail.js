import React from 'react';
import './MasterDetail.css';

export default class MasterDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: null };
    this.selectDetail = this.selectDetail.bind(this);
  }

  selectDetail(detail) {
    this.setState({ current: detail });
  }

  render() {
    const { current } = this.state;
    const { list } = this.props;

    return (
      <section className="master-detail">
        <div className="master-detail__container">
          <div className="master-detail__list">
            <ul>
              {
                (Array.isArray(list) && list.length > 0 ? 
                  list.map(d => <li key={d.key} onClick={() => this.selectDetail(d)} className={(this.state.current && this.state.current.key === d.key ? 'active' : '')}>{d.name}</li>) 
                  : <li>No records found</li>)
              }
            </ul>
          </div>
          <div className="master-detail__detail">
            <h6>Selected Record:</h6>
            <div className="fields">
            {
              (typeof current === 'object' && current !== null ?
              Object.keys(current).filter(k => k !== 'key').map(key => (
                <div className="field" key={key}>
                  <span className="field__label">{key.toUpperCase()}</span>
                  <span className="field__data">{(typeof current[key] === 'object' ? current[key].name : current[key])}</span>
                </div>
              ))
              : <div>No record selected</div>)
            }
            </div>
          </div>
        </div>
      </section>
    );
  }
}
