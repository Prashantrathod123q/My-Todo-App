import React, { Component } from "react";
import { v4 } from "uuid";
import TaskItem from "./TaskItem";
import "./TaskList.css";

export default class TaskList extends Component {
  render() {
    return (
      <table className="TodoList">
        <thead>
          <tr>
            <th className="task">Task</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tasks.map((task, index) => (
            <TaskItem
              key={v4()}
              task={task}
              index={index}
              remove={this.props.removeTask}
              update={this.props.updateTask}
              toggle={this.props.toggleTask}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
