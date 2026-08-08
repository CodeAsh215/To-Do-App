import { useState, useEffect } from "react"
import { StickyNote, Circle, CircleCheck, Trash } from "lucide-react"

function App() {

  const [task, setTask] = useState("")

  // Load saved tasks immediately when app starts
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")

    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [filter, setFilter] = useState("all")


  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])


  // ADD TASK
  const handleAdd = () => {

    if (task.trim() === "") {
      return
    }

    const newTask = {
      text: task.trim(),
      completed: false,
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask
    ])

    setTask("")
  }


  // COMPLETE / UNCOMPLETE
  const handleComplete = (index) => {

    setTasks((currentTasks) =>
      currentTasks.map((item, i) =>
        i === index
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }


  // DELETE
  const handleDelete = (index) => {

    setTasks((currentTasks) =>
      currentTasks.filter((item, i) => i !== index)
    )
  }


  // FILTER
  const filteredTasks = tasks
    .map((item, index) => ({
      ...item,
      originalIndex: index
    }))
    .filter((item) => {

      if (filter === "active") {
        return !item.completed
      }

      if (filter === "completed") {
        return item.completed
      }

      return true
    })


  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      {/* PHONE */}
      <div className="w-[390px] h-[590px] bg-white rounded-[35px] shadow-2xl border border-gray-200 overflow-hidden flex flex-col">


        {/* HEADER */}
        <nav className="px-5 pt-8 shrink-0">

          <h1 className="text-2xl font-bold">
            My Tasks
          </h1>

          <p className="text-gray-500">
            Stay organized, get things done.
          </p>

        </nav>


        {/* ADD TASK */}
        <div className="flex gap-2 w-[90%] mx-auto mt-5 shrink-0">

          <div className="flex flex-1 items-center border border-gray-300 p-3 gap-2 rounded-xl">

            <StickyNote size={20} />

            <input
              type="text"
              placeholder="What needs to be done?"
              className="w-full outline-none text-sm"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  handleAdd()
                }

              }}
            />

          </div>


          <button
            className="px-4 bg-violet-600 text-white rounded-xl cursor-pointer"
            onClick={handleAdd}
          >
            Add
          </button>

        </div>


        {/* FILTERS */}
        <div className="flex justify-evenly mt-5 border border-gray-300 w-[90%] mx-auto rounded-xl p-1 shrink-0">

          <button
            onClick={() => setFilter("all")}
            className={`p-2 rounded-lg text-sm ${
              filter === "all"
                ? "bg-violet-500 text-white"
                : "hover:bg-violet-500 hover:text-white"
            }`}
          >
            All
          </button>


          <button
            onClick={() => setFilter("active")}
            className={`p-2 rounded-lg text-sm ${
              filter === "active"
                ? "bg-violet-500 text-white"
                : "hover:bg-violet-500 hover:text-white"
            }`}
          >
            Active
          </button>


          <button
            onClick={() => setFilter("completed")}
            className={`p-2 rounded-lg text-sm ${
              filter === "completed"
                ? "bg-violet-500 text-white"
                : "hover:bg-violet-500 hover:text-white"
            }`}
          >
            Completed
          </button>

        </div>


        {/* COUNTER */}
        <p className="w-[90%] mx-auto mt-4 text-sm text-gray-500 shrink-0">

          {tasks.filter((item) => !item.completed).length} active ·{" "}

          {tasks.filter((item) => item.completed).length} completed

        </p>


        {/* TASK LIST */}
        <div className="flex-1 overflow-y-auto mt-2 pb-5">

          {filteredTasks.map((item) => (

            <div
              key={item.originalIndex}
              className="flex items-center justify-between border border-gray-200 rounded-xl mt-4 w-[90%] mx-auto p-4 shadow-sm"
            >

              <div className="flex items-center gap-2">

                {item.completed ? (

                  <CircleCheck
                    className="text-violet-500 cursor-pointer shrink-0"
                    size={22}
                    onClick={() =>
                      handleComplete(item.originalIndex)
                    }
                  />

                ) : (

                  <Circle
                    className="text-violet-500 cursor-pointer shrink-0"
                    size={22}
                    onClick={() =>
                      handleComplete(item.originalIndex)
                    }
                  />

                )}


                <span
                  className={`font-medium ${
                    item.completed
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {item.text}
                </span>

              </div>


              <Trash
                className="text-red-500 cursor-pointer shrink-0"
                size={20}
                onClick={() =>
                  handleDelete(item.originalIndex)
                }
              />

            </div>

          ))}


          {/* EMPTY STATE */}
          {filteredTasks.length === 0 && (

            <div className="flex flex-col items-center justify-center text-center mt-20 px-5">

              <StickyNote
                size={45}
                className="text-gray-300 mb-3"
              />

              <h2 className="font-semibold text-gray-600">
                No tasks here
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Add a task above to get started.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default App