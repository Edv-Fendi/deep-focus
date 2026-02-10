import type { TaskModel } from "../models/TaskModel";

export function getTaskType(task: TaskModel) {
    if (task.type === "workTime") return "Em foco"
    if (task.type === "shortBreakTime") return "Descanso breve"
    if (task.type === "longBreakTime") return "Descanso longo"

    return "Indefinido"
}