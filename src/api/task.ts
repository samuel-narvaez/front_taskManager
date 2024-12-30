import request from '../utils/request'
import store from '../store/store'

interface CreateTask {
    _id: string,
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string;
    completed: boolean;
  }

export function getTasks() {
    const token = store.getState().auth.token;
    
    return request({
        url: 'api/task',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function createTask(data: CreateTask) {
    const token = store.getState().auth.token;
    
    return request({
        url: 'api/task',
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function updateTask(data: CreateTask) {
    return request({
        url: `api/task/${data._id}`,
        method: 'put',
        data
    })
}

export function deleteTasks(taskId: string) {
    const token = store.getState().auth.token;
    
    return request({
        url: `api/task/${taskId}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
