import * as React from "react";
import * as ReactDnd from "react-dnd";
import ItemTypes from "itemTypes/todoTypes";
import TodoItem from "components/dashboard/item/TodoItem";
import AddTodoItem from "containers/dashboard/item/AddTodoItem";
import { map } from "lodash";
import "./TodoList.scss";
// import * as moment from 'moment';

const itemTarget = {
  drop(props: any, monitor: any, component: any) {
    props.postponeTodoItem(monitor.getItem());
    return {};
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
interface Props {
  items: any[];
  title: string | null;
  date: string;
  realDate: {} | null;
  filter: string;
  projects: any[];
  showButton: boolean;
  onHandleAddTodoItem: (tabIndex: number, index: number) => void;
  index: number;
  todoListIndex: number;
  todoItemIndex: number;
  connectDropTarget: ReactDnd.ConnectDropTarget;
  isOver: any;
  moveTodoItem: (
    dragUniqKey: string,
    hoverUniqKey: string,
    targetPosition: string
  ) => void;
  postponeTodoItem: (item: any) => void;
  settings: any;
}

interface State {
  toggleAddTodoButton: boolean;
  toggleDropContext: boolean;
}
class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    toggleAddTodoButton: false,
    toggleDropContext: false
  };

  handleDropContent = () => {
    this.setState({
      toggleDropContext: !this.state.toggleDropContext
    });
  };

  mapToComponent = () => {
    const {
      items,
      onHandleAddTodoItem,
      todoListIndex,
      todoItemIndex,
      index,
      realDate,
      filter,
      projects,
      settings
    } = this.props;
    let itemIndex = 0;

    return map(items, (item, key) => {
      itemIndex++;
      if (itemIndex === todoItemIndex && index === todoListIndex) {
        return (
          <AddTodoItem
            onHandleAddTodoItem={onHandleAddTodoItem}
            key={item.uniqueKey}
            index={item.uniqueKey}
            realDate={realDate}
            item={item}
            filter={filter}
            projects={projects}
            settings={settings}
          />
        );
      } else {
        return (
          <TodoItem
            {...item}
            key={item.uniqueKey}
            uniqueKey={item.uniqueKey}
            index={itemIndex}
            todoListIndex={index}
            onHandleAddTodoItem={onHandleAddTodoItem}
            onHandleDropContent={this.handleDropContent}
            moveTodoItem={this.props.moveTodoItem}
            postponeTodoItem={this.props.postponeTodoItem}
            filter={filter}
            projects={projects}
          />
        );
      }
    });
  };

  render() {
    const {
      title,
      date,
      realDate,
      showButton,
      index,
      onHandleAddTodoItem,
      todoListIndex,
      todoItemIndex,
      connectDropTarget,
      isOver,
      filter,
      projects,
      settings
    } = this.props;

    const { toggleDropContext } = this.state;
    const isActive = isOver;
    ``;
    const activedClass = isActive ? "is-active" : "";
    return (
      <div className="wtd-dashboard-todo-list">
        {title && (
          <header className="wtd-dashboard-todo-list__header">
            <h2>
              {title}
              <span>{date}</span>
            </h2>
          </header>
        )}
        {this.mapToComponent()}
        {showButton &&
          (!(todoListIndex === index) || todoItemIndex !== -1) && (
            <div className="wtd-dashboard-todo-list__add-task">
              <a
                href="javascript:;"
                onClick={() => onHandleAddTodoItem(index, -1)}
                style={{ color: settings.theme.color }}
              >
                <span />작업 추가
              </a>
            </div>
          )}
        {todoListIndex === index &&
          todoItemIndex === -1 && (
            <AddTodoItem
              onHandleAddTodoItem={onHandleAddTodoItem}
              realDate={realDate}
              filter={filter}
              projects={projects}
              settings={settings}
            />
          )}
        {toggleDropContext &&
          connectDropTarget(
            <div
              className={`wtd-dashboard-todo-list__drop-content ${activedClass}`}
            >
              <p>
                드롭하여 연기: <span>다음날로 연기</span>
              </p>
            </div>
          )}
      </div>
    );
  }
}

export default ReactDnd.DropTarget(ItemTypes.TODOITEM, itemTarget, collect)(
  TodoList
);
