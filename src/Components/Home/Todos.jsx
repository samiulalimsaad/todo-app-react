import { TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const Todos = ({ todos, setDeleteTodo, refetch }) => {
    const updateTodo = (todo) => {
        axios
            .patch(
                `https://todo-app-react-saad.herokuapp.com/${todo._id}`,
                {
                    done: !todo.done,
                },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            )
            .then(({ data }) => {
                if (data.success) {
                    toast.success("todo updated!", {
                        theme: "dark",
                    });
                    refetch();
                }
            })
            .catch(({ message }) => {
                toast.error(message, {
                    theme: "dark",
                });
            });
    };

    return (
        <div className="p-8 bg-slate-900 border border-gray-500/50 rounded-md shadow-md drop-shadow-lg  space-y-4 w-full">
            <h2 className="text-center text-3xl">Todo List</h2>
            <div className="divider" />

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos?.map((todo, i) => (
                            <tr key={todo._id}>
                                <th>{i + 1}</th>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>
                                    {todo.done ? (
                                        <span
                                            className="btn btn-success"
                                            onClick={() => updateTodo(todo)}
                                        >
                                            completed
                                        </span>
                                    ) : (
                                        <span
                                            className="btn btn-warning"
                                            onClick={() => updateTodo(todo)}
                                        >
                                            Not completed
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <div className="flex justify-evenly gap-2">
                                        <label
                                            htmlFor="ConfirmationModal"
                                            className="modal-button"
                                            onClick={() => {
                                                setDeleteTodo(todo);
                                            }}
                                        >
                                            <TrashIcon className="h-6 w-6 text-red-900 rounded-full p-1 bg-red-500 hover:bg-red-600" />
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Todos;
