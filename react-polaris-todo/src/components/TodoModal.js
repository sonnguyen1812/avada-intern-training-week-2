// src/components/TodoModal.js
import React, { useState, useCallback, useEffect } from "react";
import { Modal, FormLayout, TextField, Select } from "@shopify/polaris";

const TodoModal = ({ active, handleClose, addOrEditTodo, editText, editStatus }) => {
    const [value, setValue] = useState(editText || "");
    const [status, setStatus] = useState(editStatus || "Todo");

    useEffect(() => {
        setValue(editText || "");
        setStatus(editStatus || "Todo");
    }, [editText, editStatus]);

    const handleSubmit = useCallback(() => {
        if (value.trim()) {
            addOrEditTodo(value, status);
            handleClose();
        }
    }, [value, status, addOrEditTodo, handleClose]);

    const handleStatusChange = useCallback((newStatus) => setStatus(newStatus), []);

    const options = [
        { label: "Todo", value: "Todo" },
        { label: "Pending", value: "Pending" },
        { label: "Done", value: "Done" },
    ];

    return (
        <Modal
            open={active}
            onClose={handleClose}
            title={editText ? "Edit Todo" : "Create a new Todo"}
            primaryAction={{
                content: editText ? "Save" : "Add",
                onAction: handleSubmit,
            }}
            secondaryActions={[
                {
                    content: "Cancel",
                    onAction: handleClose,
                },
            ]}
        >
            <Modal.Section>
                <FormLayout>
                    <TextField
                        label="Task"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        autoComplete="off"
                        placeholder="Enter task"
                    />
                    <Select
                        label="Status"
                        options={options}
                        value={status}
                        onChange={handleStatusChange}
                    />
                </FormLayout>
            </Modal.Section>
        </Modal>
    );
};

export default TodoModal;
