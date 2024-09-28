// src/components/Todo.js
import React from "react";
import { BlockStack, InlineStack, Checkbox, Badge, Button } from "@shopify/polaris";

const Todo = ({ todo, index, removeTodo, handleSelectTodo, editTodo }) => {
    const getStatusTone = (status) => {
        switch (status) {
            case "Done":
                return "success";
            case "Pending":
                return "attention";
            default:
                return "critical";
        }
    };

    return (
        <div style={{ paddingBlock: 15, paddingInline: 20 }}>
            <BlockStack>
                <InlineStack align={"space-between"}>
                    <InlineStack alignment="center" gap={"600"}>
                        <InlineStack align={"center"} gap={"200"}>
                            <div>
                                <Checkbox
                                    checked={todo.isSelected}
                                    onChange={() => handleSelectTodo(index)}
                                />
                            </div>
                            <div
                                style={{
                                    textDecoration: todo.status === "Done" ? "line-through" : "",
                                    paddingTop: "3px",
                                }}
                            >
                                {todo.text}
                            </div>
                        </InlineStack>
                    </InlineStack>
                    <InlineStack alignment="center" gap={"400"}>
                        <Badge tone={getStatusTone(todo.status)}>
                            {todo.status || "Todo"}
                        </Badge>
                        <Button size="slim" onClick={() => editTodo(index)}>
                            Edit
                        </Button>
                        <Button destructive size="slim" onClick={() => removeTodo(index)}>
                            Delete
                        </Button>
                    </InlineStack>
                </InlineStack>
            </BlockStack>
        </div>
    );
};

export default Todo;
