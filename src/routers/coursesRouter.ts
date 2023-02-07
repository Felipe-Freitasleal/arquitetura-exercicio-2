import express from "express";
import { CoursesController } from "../controller/coursesController";

export const courseRouter = express.Router()


const coursesController = new CoursesController()

courseRouter.post("/", coursesController.createCourse)

courseRouter.get("/", coursesController.getCourses)

courseRouter.put("/:id", coursesController.updateCourse)

courseRouter.delete("/:id", coursesController.deleteCourse)