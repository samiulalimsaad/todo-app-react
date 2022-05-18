import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddTodo from "./AddTodo";
import ConfirmationModal from "./ConfirmationModal";
import Todos from "./Todos";

const Home = () => {
    const [deleteTodo, setDeleteTodo] = useState({});
    const navigate = useNavigate();
    const { isLoading, error, data, refetch } = useQuery("repoData", () =>
        fetch("https://todo-app-react-saad.herokuapp.com/", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                if (res?.status === 401 || res?.status === 403) {
                    toast.error("unauthorized user", {
                        theme: "dark",
                    });
                    navigate("/login");
                    localStorage.removeItem("accessToken");
                }
                return res.json();
            })
            .catch(({ message }) => {
                throw new Error(message);
            })
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-4xl text-primary">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-4xl text-primary">
                {"An error has occurred: " + error.message}
            </div>
        );
    }
    return (
        <div className="flex justify-center text-4xl text-primary p-20 ">
            <div className="p-20 space-y-8 w-full">
                <div className="flex justify-center items-center text-4xl text-primary">
                    <AddTodo refetch={refetch} />
                </div>
                {data?.allTodo?.length > 0 && (
                    <div>
                        <Todos
                            todos={data?.allTodo}
                            setDeleteTodo={setDeleteTodo}
                            refetch={refetch}
                        />
                    </div>
                )}
            </div>
            {deleteTodo?._id && (
                <ConfirmationModal
                    deleteTodo={deleteTodo}
                    setDeleteTodo={setDeleteTodo}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default Home;
