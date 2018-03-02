import React, { Component } from 'react';

import AppHeader from './AppHeader';
import TodoBoard from './TodoBoard';
export default class BoardMain extends Component {
  render() {
    const { todoItems, currentUser } = this.props;  
    return (
      <div> 
        <AppHeader currentUser={ currentUser }/>
        <div className="todo-app__content">
          <TodoBoard todoItems={ todoItems } currentUser={ currentUser } /> 
        </div>
      </div>
    )
  }
}