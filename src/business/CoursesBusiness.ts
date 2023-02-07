import { CoursesDatabase } from "../database/CoursesDatabase";
import { BadRequestError } from "../error/BadRequest";
import { Courses } from "../models/Courses";
import { CourseDB } from "../types";

export class CoursesBusiness {
  // propriedades

  // métodos

  public createCourse = async (input: CourseDB) => {
    const { id, name, lessons } = input;

    if (typeof id !== "string") {
      throw new BadRequestError("'id' deve ser string");
    }

    if (typeof name !== "string") {
      throw new BadRequestError("'name' deve ser string");
    }

    if (typeof lessons !== "number") {
      throw new BadRequestError("'email' deve ser string");
    }

    const coursesDatabase = new CoursesDatabase();
    const findCourse = await coursesDatabase.findCourse(id);

    if (findCourse) {
      throw new BadRequestError("'id' já existe");
    }

    const newCourse = new Courses(id, name, lessons);

    const newCourseDB: CourseDB = {
      id: newCourse.getId(),
      name: newCourse.getName(),
      lessons: newCourse.getLesson(),
    };

    await coursesDatabase.createCourse(newCourseDB);

    return {
      message: "Curso criado com sucesso!",
      course: newCourse,
    };
  };

  public getCourses = async (q: string | undefined) => {
    const coursesDatabase = new CoursesDatabase();
    const coursesDB = await coursesDatabase.getCourses(q);

    const courses = coursesDB.map(
      (course) => new Courses(course.id, course.name, course.lessons)
    );

    return courses;
  };

  public updateCourse = async (input: any) => {
    const { idCourse, newId, newName, newLessons } = input;

    const coursesDatabase = new CoursesDatabase();
    const findCourse = await coursesDatabase.findCourse(idCourse);

    if (!findCourse) {
      throw new BadRequestError("'id' do curso não encontrado");
    }

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        throw new Error("'id' deve ser string");
      }
    }
    if (newName !== undefined) {
      if (typeof newName !== "string") {
        throw new Error("'name' deve ser string");
      }
    }
    if (newLessons !== undefined) {
      if (typeof newLessons !== "number") {
        throw new Error("'Aulas' deve ser um número");
      }
    }

    const course = new Courses(newId, newName, newLessons);

    const courseDB: CourseDB = {
      id: newId || course.getId(),
      name: newName || course.getName(),
      lessons: newLessons || course.getLesson(),
    };

    await coursesDatabase.updateCourse(idCourse, courseDB);

    return {
      message: "Curso atualizado",
      course: course,
    };
  };

  public deleteCourse = async (id: string) => {
    const coursesDatabase = new CoursesDatabase();
    const findCourse = await coursesDatabase.findCourse(id);

    if (!findCourse) {
      throw new BadRequestError("'id' não encontrado");
    }

    await coursesDatabase.deleteCourse(id);

    return {
      message: "Curso excluído com sucesso",
      course: findCourse,
    };
  };
}
