import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import UserGreet from "../../components/UserGreet/UserGreet";
import "./addnewtask.css";
import CategoryCard from "../../components/card/CategoryCard";
import { assets } from "../../assets/assets";
import { useFirebase } from "../../context/firebaseContext";

function AddNewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const firebase = useFirebase();

  const category = [
    {
      value: "Professional / Work",
      label: "Professional / Work",
      subCategoriesArr: [
        "Reports",
        "Meetings",
        "Presentations",
        "Project tasks",
      ],
      image: assets.Work,
    },
    {
      value: "Hobbies/Creative",
      label: "Hobbies/Creative",
      subCategoriesArr: [
        "Music practice",
        "Photography",
        "Gardening",
        "Painting",
      ],
      image: assets.hobbieImg,
    },
    {
      value: "Personal",
      label: "Personal",
      subCategoriesArr: [
        "Household chores",
        "Self-care (exercise, meditation)",
        "Appointments",
        "Diet plan",
      ],
      image: assets.healthImg,
    },
    {
      value: "Events",
      label: "Events",
      subCategoriesArr: [
        "Birthdays",
        "Anniversaries",
        "Social gatherings",
        "Cultural or religious events",
      ],
      image: assets.evenImg,
    },
    {
      value: "Finance",
      label: "Finance",
      subCategoriesArr: [
        "Pay bills",
        "Budget planning",
        "Investment tracking",
        "Loan/EMI reminders",
      ],
      image: assets.financeImg,
    },
    {
      value: "Skill Development",
      label: "Skill Development",
      subCategoriesArr: [
        "Practice sessions",
        "Reading goals",
        "Study schedule",
        "Online courses",
      ],
      image: assets.skillImg,
    },

    {
      value: "Shopping",
      label: "Shopping",
      subCategoriesArr: [
        "Groceries",
        "Clothing",
        "Electronics",
        "Miscellaneous items",
      ],
      image: assets.shoppingImg,
    },
    {
      value: "Travel",
      label: "Travel",
      subCategoriesArr: [
        "Plan itinerary",
        "Packing checklist",
        "Book tickets",
        "Diet plan",
      ],
      image: assets.travelImg,
    },
  ];

  const priority = [
    { value: "Urgent", label: "Urgent" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Task added successfully!");
    firebase.handleAddTask(
      title,
      description,
      selectedCategory,
      selectedPriority,
      dueDate
    );
    setTitle("");
    setDescription("");
    setSelectedCategory("");
    setSelectedPriority("");
    setDueDate(null);
  };

  return (
    <div>
      <UserGreet />
      <div className="addnewtask--container" role="main">
        <form onSubmit={handleSubmit} className="form--container">
          <h2>Add new Task</h2>
          <div className="task--input">
            <TextField
              style={{ marginBottom: "0.2em", width: "100%" }}
              required
              id="title"
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Task Title Input"
            />
          </div>
          <div className="task--input">
            <TextField
              style={{ marginBottom: "0.2em", width: "100%" }}
              label="Task Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Task Description Input"
            />
          </div>
          <div className="task--input">
            <TextField
              select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              fullWidth
              SelectProps={{ native: true }}
              aria-label="Select Task Category"
            >
              <option value="">Select Category</option>
              {category.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
          <div className="task--input">
            <TextField
              style={{ marginBottom: "0.5em" }}
              select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              fullWidth
              SelectProps={{ native: true }}
              aria-label="Select Task Priority"
            >
              <option>Select Priority</option>
              {priority.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              style={{ width: "100%" }}
              label="Due Date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              aria-label="Due Date Picker"
            >
            </DatePicker>
          </LocalizationProvider>
          <Button className="add--new--task--btn"
            variant="contained"
            type="submit"
            aria-label="Submit Task"
          >
            Add New Task
          </Button>
        </form>
        <div className="category--container">
          {category.map((cat, index) => (
            <CategoryCard
              key={index}
              categoryName={cat.value}
              subCategoriesArr={cat.subCategoriesArr}
              image={cat.image}
              aria-label={`Category Card: ${cat.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddNewTask;
