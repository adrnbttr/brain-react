import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import ListStore from '../stores/ListStore.js';
import ListService from '../services/ListService.js';
import List from './List';
import Task from './Task';

export default AuthenticatedComponent(class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getListState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.list) {
      this.getList();
    }

    ListStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ListStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getListState());
  }

  getList() {
    ListService.getList();
  }

  getListState() {
    return {
      list: ListStore.list
    };
  }

  render() {
    return (
      <div id="page-container" className="sidebar-l sidebar-o side-scroll header-navbar-fixed">
        <nav id="sidebar">
            <div id="sidebar-scroll">
                <div className="sidebar-content">
                    <div className="side-header side-content bg-white-op">
                        <button className="btn btn-link text-gray pull-right hidden-md hidden-lg" type="button" data-toggle="layout" data-action="sidebar_close">
                            <i className="fa fa-times"></i>
                        </button>
                        <a className="h5 text-white" href="index.html">
                            <i className="fa fa-check-square text-primary"></i> <span className="h5 font-w600 sidebar-mini-hide">brain</span>
                        </a>
                    </div>
                    <div className="side-content">
                        <List user={this.props.user} list={this.state.list}/>
                    </div>
                </div>
            </div>
        </nav>
        if (this.state.list) {
            <Task task={this.state.list}/>
        }
      </div>
    );
  }
});
