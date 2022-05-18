import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const AddTodo = ({ refetch }) => {
    const addTodo = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;

        if (title || description) {
            axios
                .post(
                    "https://todo-app-react-saad.herokuapp.com/login",
                    {
                        title,
                        description,
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
                        toast.success("todo added!", {
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
        }
    };

    return (
        <div className="card w-96 bg-neutral text-neutral-content">
            <form onSubmit={addTodo} className="card-body items-center">
                <h2 className="text-center text-3xl">Add A Todo</h2>
                <div className="divider" />
                <div className="form-control w-full">
                    <label
                        className="block mb-2 text-sm font-bold "
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Add a title"
                        className="input input-bordered input-success w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label
                        className="block mb-2 text-sm font-bold "
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        placeholder="add a description"
                        className="input input-bordered input-success w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <input
                        type="submit"
                        value="add"
                        className="input input-bordered input-success w-full btn btn-secondary mt-4"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddTodo;
