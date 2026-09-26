const express = require("express");
const router = express.Router();
const students = require("../data/students");

const getNextId = () => {
  return students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
};

// GET /students
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// GET /students/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`
    });
  }

  res.status(200).json({ success: true, data: student });
});

// POST /students
router.post("/", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, age and course"
    });
  }

  const newStudent = { id: getNextId(), name, age, course };
  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent
  });
});

// PUT /students/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`
    });
  }

  const { name, age, course } = req.body;

  if (!name && !age && !course) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update"
    });
  }

  if (name) student.name = name;
  if (age) student.age = age;
  if (course) student.course = course;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student
  });
});

// DELETE /students/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`
    });
  }

  const deleted = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deleted
  });
});

module.exports = router;