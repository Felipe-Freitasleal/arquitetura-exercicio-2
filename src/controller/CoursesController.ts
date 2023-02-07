import { Request, Response } from "express";
import { CoursesBusiness } from "../business/CoursesBusiness";
import { BaseError } from "../error/BaseError";

export class CoursesController {
  // propriedades

  // métodos
  public createCourse = async (req: Request, res: Response) => {
    const input = {
      id: req.body.id,
      name: req.body.name,
      lessons: req.body.lessons,
    };

    const coursesBusiness = new CoursesBusiness();
    const output = await coursesBusiness.createCourse(input);

    res.status(200).send(output);
  };

  public getCourses = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string;

      const coursesBusiness = new CoursesBusiness();
      const output = await coursesBusiness.getCourses(q);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public updateCourse = async (req: Request, res: Response) => {
    const input = {
      idCourse: req.params.id,
      newId: req.body.id,
      newName: req.body.name,
      newLessons: req.body.lessons,
    };

    const coursesBusiness = new CoursesBusiness();
    const output = await coursesBusiness.updateCourse(input);

    res.status(200).send(output);
  };

  public deleteCourse = async (req: Request, res: Response) => {
    const input = req.params.id;

    const coursesBusiness = new CoursesBusiness();
    const output = await coursesBusiness.deleteCourse(input);

    res.status(200).send(output);
  };
}
