import { CourseDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CoursesDatabase extends BaseDatabase {
  // propriedades
  public static TABLE_COURSES = "courses";

  // métodos
  public async createCourse(newCourse: CourseDB) {
    await BaseDatabase.connection(CoursesDatabase.TABLE_COURSES).insert(
      newCourse
    );
  }

  public async getCourses(q: string | undefined) {
    let courseDB;

    if (q) {
      const result: CourseDB[] = await BaseDatabase.connection(
        CoursesDatabase.TABLE_COURSES
      ).where("name", "LIKE", `%${q}%`);

      courseDB = result;
    } else {
      const result: CourseDB[] = await BaseDatabase.connection(
        CoursesDatabase.TABLE_COURSES
      );

      courseDB = result;
    }

    return courseDB;
  }

  public async findCourse(id: string) {
    const [courseDb] = await BaseDatabase.connection(
      CoursesDatabase.TABLE_COURSES
    ).where({ id });

    return courseDb;
  }

  public async updateCourse(id: string, course: CourseDB) {
    await BaseDatabase.connection(CoursesDatabase.TABLE_COURSES)
      .update(course)
      .where({ id });
  }

  public async deleteCourse(id: string) {
    await BaseDatabase.connection(CoursesDatabase.TABLE_COURSES)
      .del()
      .where({ id });
  }
}
