import React, { Component } from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import "./Main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    let allTasks = localStorage.getItem("tasks");
    if (allTasks === null) {
      allTasks = [];
    } else {
      allTasks = JSON.parse(allTasks);
    }

    this.state = { tasks: allTasks };
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }

  createTask(task) {
    if (task.trim() === "") {
      window.alert("Task cannot be Empty!");
      return;
    }
    let newTask = { taskName: task.trim(), isCompleted: false };
    let allTasks = [...this.state.tasks, newTask];
    this.setState({ tasks: allTasks }, () => {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      window.alert("Task added successfully!");
    });
  }

  deleteTask(index) {
    let arr = this.state.tasks.filter((task, idx) => idx !== index);
    this.setState({ tasks: arr }, () => {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      window.alert("Task deleted successfully!");
    });
  }

  editTask(index, value) {
    let arr = [...this.state.tasks];
    arr[index].taskName = value;
    this.setState({ tasks: arr }, () => {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      window.alert("Task updated successfully!");
    });
  }

  toggleTask(index) {
    let arr = [...this.state.tasks];
    arr[index].isCompleted = !arr[index].isCompleted;
    this.setState({ tasks: arr }, () => {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
      if (arr[index].isCompleted) {
        window.alert("Task completed successfully!");
      }
    });
  }

  render() {
    return (
      <div className="Main">
        <h1>Todo List</h1>
        <div className="content">
          <div>
            <CreateTask addTask={this.createTask} />
          </div>
          <div>
            <TaskList
              tasks={this.state.tasks}
              removeTask={this.deleteTask}
              updateTask={this.editTask}
              toggleTask={this.toggleTask}
              retrieveTask={this.retrieveTask}
            />
          </div>
        </div>
      </div>
    );
  }
}
