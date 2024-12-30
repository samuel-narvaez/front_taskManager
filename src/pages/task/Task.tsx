import { useEffect, useState } from 'react';
import moment from 'moment';
import SweetAlert2 from 'sweetalert2';
import { getTasks, createTask, updateTask, deleteTasks } from "../../api/task";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";

interface Task {
    _id: string;
    title: string;
    description: string;
    priority: string;
    completed: boolean;
    dueDate: string;
}


const Task = () => {
    const [allTask, setAllTask] = useState<Task[]>([]);
    const [originalTasks, setOriginalTasks] = useState<Task[]>([]);
    const [open, setOpen] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [typeModal, setTypeModal] = useState('');
    const [formValues, setFormValues] = useState({
        _id: '',
        title: '',
        description: '',
        priority: '',
        status: 'active',
        dueDate: new Date(),
        completed: false
    })

    const handleOpen = (type: string) => {
        type === 'save'
            ? (setTitleModal('Create Task'), setTypeModal('save'), setFormValues({
                _id: '',
                title: '',
                description: '',
                priority: '',
                status: 'active',
                dueDate: new Date(),
                completed: false
            }))
            : (setTitleModal('Edit Task'), setTypeModal('update'));
        setOpen(!open)
    };

    const handleOptionButtonModal = () => {
        typeModal === 'save' ? savedTask() : editTask();
    }

    const showAlertDelete = async (taskId: string) => {
        await SweetAlert2.fire({
            title: '¿Está seguro?',
            text: `¿Desea eliminar esta tarea?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(taskId);
            }
        });
    };

    const handleDelete = async (taskId: string) => {
        try {
            await deleteTasks(taskId)
            fetchTasks();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setAllTask(response.data);
            setOriginalTasks(response.data);
        } catch (error) {
            console.error('Error al obtener tareas:', error);
        }
    };

    const filterTasks = (completed: boolean | null) => {
        if (completed === null) {
            setAllTask(originalTasks);
        } else {
            const filtering = originalTasks.filter(task => task.completed === completed);
            setAllTask(filtering);
        }
    };

    const savedTask = async () => {
        try {
            await createTask({ ...formValues, dueDate: formValues.dueDate.toISOString() });
            fetchTasks();
            setOpen(!open)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const editTask = async () => {
        try {
            await updateTask({ ...formValues, dueDate: formValues.dueDate.toISOString() });
            fetchTasks();
            setOpen(!open)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <div className="w-full mx-auto p-6 bg-cyan-300 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                    <div className="font-bold text-xl">
                        <h2>All Task</h2>
                    </div>

                    <div className="flex items-center space-x-2 rounded-lg shadow bg-gray-50 p-2">
                        <div className="flex items-center space-x-1">
                            <button onClick={() => filterTasks(null)} className="text-sm font-medium inline-block px-2 border-r border-gray-200">All</button>
                            <button onClick={() => filterTasks(true)} className="text-sm font-medium inline-block px-2 border-r border-gray-200">Completed</button>
                            <button onClick={() => filterTasks(false)} className="text-sm font-medium inline-block px-2 border-gray-200">Pending</button>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <p className="text-gray-800">
                        <div className="relative h-full w-full flex flex-wrap justify-start gap-3">


                            <div className="w-full max-w-md lg:w-[300px] h-[260px] overflow-hidden mx-auto hover:scale-105 transition-all duration-500 transform will-change-transform">
                                <button onClick={() => handleOpen('save')} className="border-dashed border-2 border-gray-500 w-[300px] h-[260px] p-1 rounded-lg">
                                    <div className="w-full h-full flex items-center justify-center p-2 rounded-lg">
                                        <span className="inline-block">
                                            Add New Task
                                        </span>
                                    </div>
                                </button>
                            </div>


                            {allTask.map((task, i) => (
                                <div key={i} className="w-full max-w-md lg:w-[300px] h-[260px] bg-white rounded-xl shadow-md overflow-hidden mx-auto">
                                    <div className="flex justify-between items-center px-6 py-4">
                                        <div className="flex space-x-1">
                                            <div>
                                                <div className="text-lg font-bold">{task.title}</div>
                                                <div className="text-sm text-left text-gray-500">{moment(task.dueDate).format("YYYY-MM-DD HH:mm")}</div>
                                            </div>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="text-sm text-gray-800 h-24 overflow-y-auto">
                                            {task.description}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center space-x-4 pt-2 border-t border-gray-200 p-4 ">
                                        <div className="flex items-center space-x-4">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${task.completed
                                                    ? "bg-green-400 text-gray-800 ring-green-600/20"
                                                    : "bg-yellow-400 text-gray-800 ring-yellow-600/20"
                                                    }`}
                                            >
                                                {task.completed ? "Completed" : "Pending"}
                                            </span>
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset 
                                                        ${task.priority === 'low'
                                                        ? "bg-blue-400 text-white ring-blue-600/20"
                                                        : task.priority === 'medium'
                                                            ? "bg-yellow-800 text-white ring-yellow-600/20"
                                                            : "bg-red-400 text-white ring-red-600/20"
                                                    }`}
                                            >
                                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <button type='button' onClick={() => {
                                                handleOpen('update'); setFormValues({
                                                    ...formValues,
                                                    _id: task._id,
                                                    priority: task?.priority,
                                                    description: task?.description,
                                                    title: task?.title,
                                                });
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                            <button type='button' onClick={() => showAlertDelete(task._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-deep-orange-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </p>
                </div>
            </div>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{titleModal}</DialogHeader>
                <DialogBody>
                    <form className="mt-8 mb-2  max-w-screen-lg w-full">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Title
                            </Typography>
                            <Input
                                size="lg"
                                placeholder=""
                                value={formValues.title}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Description
                            </Typography>
                            <Input
                                size="lg"
                                placeholder=""
                                value={formValues.description}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Priority
                            </Typography>
                            <Select value={formValues.priority} onChange={(value) => setFormValues({ ...formValues, priority: value as string })}>
                                <Option value='low'>Low</Option>
                                <Option value='medium'>Medium</Option>
                                <Option value='high'>High</Option>
                            </Select>
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={() => setOpen(!open)}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleOptionButtonModal}>
                        <span>Save</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default Task;
