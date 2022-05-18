import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const ConfirmationModal = ({ deleteTodo, refetch, setDeleteTodo }) => {
    const deleteTodoHandler = (e) => {
        e.preventDefault();
        axios
            .delete(
                `https://todo-app-react-saad.herokuapp.com/${deleteTodo._id}`,
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
                    toast.success("todo deleted!", {
                        theme: "dark",
                    });
                    refetch();
                    setDeleteTodo({});
                }
            })
            .catch(({ message }) => {
                toast.error(message, {
                    theme: "dark",
                });
            });
    };

    return (
        <>
            <input
                type="checkbox"
                id="ConfirmationModal"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Do you want to delete {deleteTodo.title}?
                    </h3>
                    <p className="py-4 ">{deleteTodo.description}</p>
                    <div className="modal-action">
                        <label
                            htmlFor="ConfirmationModal"
                            className="btn btn-warning"
                        >
                            cancel
                        </label>
                        <label
                            htmlFor="ConfirmationModal"
                            className="btn btn-error"
                            onClick={deleteTodoHandler}
                        >
                            YES
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModal;
