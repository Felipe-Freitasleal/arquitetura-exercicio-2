export class Courses {
    constructor(
        private id: string,
        private name: string,
        private lessons: number
    ) {}

    public getId(): string {
        return this.id
    }
    
    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }
    
    public setName(value: string): void {
        this.name = value
    }

    public getLesson(): number {
        return this.lessons
    }
    
    public setLessons(value: number): void {
        this.lessons = value
    }
}