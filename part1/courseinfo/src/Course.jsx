
const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <p><strong>total of {total} exercises</strong></p>
    )
}




const Course = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part => (
            <p key={part.id}>{part.name} {part.exercises}</p>
            ))}
            <Total parts={course.parts} />
        </div>
    )
}

export default Course