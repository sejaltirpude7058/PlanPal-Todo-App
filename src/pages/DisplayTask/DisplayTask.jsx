import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebaseContext";
import TaskCard from "../../components/card/TaskCard";
import UserGreet from "../../components/UserGreet/UserGreet";
import Button from "@mui/material/Button";
import "./displayTask.css";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";

function DisplayTask() {
  const [tasks, setTasks] = useState([]);
  const firebase = useFirebase();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskData = await firebase.handledisplayTasks();
        console.log("Tasks fetched:", taskData);
        setTasks(Array.isArray(taskData) ? taskData : []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, [firebase]);

  const handleToggleCompletion = async (taskId, currentStatus) => {
    await firebase.handleToggleTaskCompletion(taskId, currentStatus);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !currentStatus } : task
      )
    );
  };

  const getTaskColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "#fc0505";
      case "High":
        return "#e68507";
      case "Medium":
        return "#0392ca";
      case "Completed":
        return "#3e9c05";
      default:
        return "#0392ca"; // Default background color
    }
  };

  const handleDeleteTask = async (taskId) => {
    await firebase.deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleDeleteAllTasks = async () => {
    await firebase.deleteAllTasks();
    setTasks([]);
  };

  const calculateTaskCounts = () => {
    const urgentCount = tasks.filter(
      (task) => task.selectedPriority === "Urgent"
    ).length;
    const highCount = tasks.filter(
      (task) => task.selectedPriority === "High"
    ).length;
    const completedCount = tasks.filter((task) => task.isDone).length;

    return { urgentCount, highCount, completedCount };
  };

  const { urgentCount, highCount, completedCount } = calculateTaskCounts();

  return (
    <>
      <UserGreet />
      <div className="display--task--container">
        <div className="task--container">
          <div className="task--head">
            <h2>Your Tasks</h2>
            <div className="delete--add--btn--container">
              <Button
                onClick={handleDeleteAllTasks}
                className="delete--all--btn"
                variant="contained"
              >
                Delete All Tasks
              </Button>
              <Button
                onClick={() => navigate("/addnewtask")}
                className="add--more--btn"
                variant="contained"
              >
                Add More Tasks
              </Button>
            </div>
          </div>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div className="task--card" key={task.id}>
                <TaskCard
                  id={task.id}
                  title={task.title}
                  category={task.selectedCategory}
                  description={task.description}
                  dueDate={task.dueDate}
                  createdAt={task.createdAt}
                  getTaskColor={() => getTaskColor(task.selectedPriority)}
                  onClickDelete={() => handleDeleteTask(task.id)}
                  onClickMarkDone={() =>
                    handleToggleCompletion(task.id, task.isDone)
                  }
                  isDone={task.isDone}
                />
              </div>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </div>
        <div className="task--status">
          <h3 className="task--status--head">Task Status</h3>
          <div className="task--status--container">
            <div className="task--status--container--inner urgent">
              <CircleIcon className="priority--icon urgent--icon"/>
              <strong>Urgent Tasks</strong>
              <p>Tasks that require action within the next few hours.</p>
              <p>Count: {urgentCount}</p>
            </div>
            <div className="task--status--container--inner high">
              <CircleIcon className="priority--icon high--icon" />
              <strong>High Priority Tasks</strong>
              <p>Tasks that need immediate attention.</p>
              <p>Count: {highCount}</p>
            </div>
            <div className="task--status--container--inner completed">
              <CircleIcon
                className="priority--icon completed--icon"
               
              />
              <strong>Completed Tasks</strong>
              <p>Tasks that are already finished.</p>
              <p>Count: {completedCount}</p>
            </div>
            <div className="task--status--container--inner ongoing">
              <CircleIcon className="priority--icon ongoing--icon"/>
              <strong>Ongoing Tasks</strong>
              <p>Tasks currently in progress.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayTask;
