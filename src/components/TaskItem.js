import React, { Component } from "react";
import "./TaskItem.css";

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = { task: this.props.task.taskName, isEditing: false };
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setIsEditing = this.setIsEditing.bind(this);
  }

  deleteTask() {
    this.props.remove(this.props.index);
  }

  toggleTask() {
    this.props.toggle(this.props.index);
  }

  handleChange(e) {
    this.setState({ task: e.target.value });
  }

  setIsEditing(editing) {
    this.setState({ task: this.props.task.taskName, isEditing: editing });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update(this.props.index, this.state.task);
    this.setIsEditing(false);
  }

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <tr>
          <td colSpan="2">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.task}
                onChange={this.handleChange}
              />
              <span style={{ float: "right" }}>
                <button className="save">Save</button>
                <button
                  className="back"
                  onClick={() => this.setIsEditing(false)}
                >
                  Back
                </button>
              </span>
            </form>
          </td>
        </tr>
      );
    } else {
      result = (
        <tr>
          <td onClick={this.toggleTask}>
            <input
              type="checkbox"
              readOnly
              checked={this.props.task.isCompleted}
            />
            <span
              className={
                this.props.task.isCompleted ? "completed" : "not-completed"
              }
            >
              {this.props.task.taskName}
            </span>
          </td>
          <td className="actions">
            <button
              className="task edit"
              onClick={() => this.setIsEditing(true)}
            >
              Edit
            </button>
            <button className="task delete" onClick={this.deleteTask}>
              Delete
            </button>
          </td>
        </tr>
      );
    }
    return result;
  }
}
