import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

class MyTasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.list,
      tasksList: [],
      task: '',
      tag: 'Health',
      activeTag: {tab: ''},
    }
  }

  onChangeTask = event => {
    this.setState({
      task: event.target.value,
    })
  }

  onChangeTag = event => {
    this.setState({
      tag: event.target.value,
    })
  }

  onClickTag = event => {
    const val = event.target.value
    const {activeTag} = this.state
    const {tab} = activeTag
    if (tab === '') {
      this.setState(prevState => ({
        activeTag: {...prevState.activeTag, tab: val},
      }))
    } else if (tab === val) {
      this.setState(prevState => ({
        activeTag: {...prevState.activeTag, tab: ''},
      }))
    } else {
      this.setState(prevState => ({
        activeTag: {...prevState.activeTag, tab: val},
      }))
    }
  }

  onClickAddTaskButton = () => {
    const {task, tag} = this.state
    const id = uuidv4()

    // Prevent empty tasks from being added
    if (task.trim() !== '' && tag.trim() !== '') {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, {id, task, tag}],
        task: '', // Reset task input
        tag: 'Health', // Reset tag to default or any initial tag
      }))
    }
  }

  render() {
    const {list, tasksList, task, activeTag, tag} = this.state
    const {tab} = activeTag

    // Filter tasks based on the selected tag
    const filteredTasksList =
      tab !== ''
        ? tasksList.filter(eachItem => eachItem.tag === tab)
        : tasksList

    return (
      <div className="app-container">
        <div className="left-card">
          <h1 className="main-heading">Create a task!</h1>
          <form className="form-style">
            <label htmlFor="task" className="label-style">
              Task
            </label>
            <input
              type="text"
              placeholder="Enter the task here"
              id="task"
              className="input-style"
              value={task} // Bind value to state
              onChange={this.onChangeTask}
            />
            <label htmlFor="options" className="label-style">
              Tags
            </label>
            <select
              id="options"
              className="input-style"
              value={tag} // Bind value to state
              onChange={this.onChangeTag}
            >
              {list.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="add-task-button"
              onClick={this.onClickAddTaskButton}
            >
              Add Task
            </button>
          </form>
        </div>

        <div className="right-card">
          <h1 className="heading-right-card">Tags</h1>
          <ul className="unordered-list">
            {list.map(eachItem => (
              <li key={eachItem.optionId}>
                <button
                  type="button"
                  className={
                    eachItem.displayText === tab
                      ? 'active-button-style'
                      : 'button-style'
                  }
                  onClick={this.onClickTag}
                  value={eachItem.displayText}
                >
                  {eachItem.displayText}
                </button>
              </li>
            ))}
          </ul>

          <h1 className="heading-right-card">Tasks</h1>
          <ul className="task-list">
            {tasksList.length === 0 ? (
              <p className="no-tasks-para">No Tasks Added Yet</p>
            ) : (
              filteredTasksList.map(eachItem => (
                <li key={eachItem.id} className="list-style">
                  <p className="task">{eachItem.task}</p>
                  <p className="tag">{eachItem.tag}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default MyTasks
