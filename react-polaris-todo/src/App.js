// src/App.js
import React, { useState, useCallback } from "react";
import {
  Card,
  Page,
  Button,
  Checkbox,
  Layout,
  InlineStack,
  Frame,
  TopBar,
  ActionList, PageActions,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import Todo from "./components/Todo";
import TodoModal from "./components/TodoModal";
import "@shopify/polaris/build/esm/styles.css";

const App = () => {
  const [todos, setTodos] = useState([
    { text: "Learn about React", status: "Pending", isSelected: false },
    { text: "Meet friend for lunch", status: "Pending", isSelected: false },
    { text: "Build a cool todo app", status: "Todo", isSelected: false },
  ]);

  const [isModalActive, setIsModalActive] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalActive((isActive) => !isActive);
  }, []);

  const openCreateModal = useCallback(() => {
    setEditIndex(null);
    toggleModal();
  }, [toggleModal]);

  const openEditModal = useCallback(
      (index) => {
        setEditIndex(index);
        toggleModal();
      },
      [toggleModal],
  );

  const addTodo = useCallback((text, status) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { text, status: status || "Todo", isSelected: false },
    ]);
  }, []);

  const saveTodo = useCallback(
      (text, status) => {
        if (editIndex !== null) {
          setTodos((prevTodos) =>
              prevTodos.map((todo, i) =>
                  i === editIndex ? { ...todo, text, status } : todo,
              ),
          );
        } else {
          addTodo(text, status);
        }
        setEditIndex(null);
      },
      [addTodo, editIndex],
  );

  const removeTodo = useCallback((index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }, []);

  const handleSelectTodo = useCallback((index) => {
    setTodos((prevTodos) =>
        prevTodos.map((todo, i) =>
            i === index ? { ...todo, isSelected: !todo.isSelected } : todo,
        ),
    );
  }, []);

  const allSelected = todos.every((todo) => todo.isSelected);
  const handleSelectAll = useCallback(() => {
    setTodos((prevTodos) =>
        prevTodos.map((todo) => ({ ...todo, isSelected: !allSelected })),
    );
    setShowDeleteOptions(!showDeleteOptions);
  }, [allSelected]);

  const deleteSelectedTodos = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isSelected));
    setShowDeleteOptions(false);
  }, []);

  const toggleIsUserMenuOpen = useCallback(
      () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
      [],
  );

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue("");
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const userMenuMarkup = (
      <TopBar.UserMenu
          actions={[{ items: [{ content: "Account Settings" }] }, { items: [{ content: "Logout" }] }]}
          name="User Name"
          detail="Account Details"
          open={isUserMenuOpen}
          onToggle={toggleIsUserMenuOpen}
      />
  );

  const searchResultsMarkup = isSearchActive ? (
      <ActionList items={[{ content: "Todos", onAction: () => console.log("Todos") }]} />
  ) : null;

  const searchFieldMarkup = (
      <TopBar.SearchField
          onChange={handleSearchChange}
          value={searchValue}
          placeholder="Search"
          showFocusBorder
      />
  );

  const topBarMarkup = (
      <TopBar
          userMenu={userMenuMarkup}
          searchResultsVisible={isSearchActive}
          searchField={searchFieldMarkup}
          searchResults={searchResultsMarkup}
          onSearchResultsDismiss={handleSearchResultsDismiss}
      />
  );

  const logo = {
    topBarSource:
        "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
    accessibilityLabel: "Shopify",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    width: 90,
  };

  return (
    <Frame topBar={topBarMarkup} logo={logo}>
      <Page
        title="Todos"
        primaryAction={
          <Button icon={PlusIcon} variant={"primary"} onClick={openCreateModal}>
            Add new
          </Button>
        }
      >
        <Layout>
          <Layout.Section>
            <Card>
              <InlineStack blockAlign={"center"} align={"space-between"}>
                <InlineStack gap="600">
                  <span>{`Showing ${todos.length} todos`}</span>
                  {showDeleteOptions && (
                      <InlineStack gap="300">
                        <PageActions
                            secondaryActions={[
                              {
                                content: "Delete",
                                destructive: true,
                                onAction: deleteSelectedTodos,
                              },
                            ]}
                        />
                        <Button onClick={() => setShowDeleteOptions(false)}>
                          Cancel
                        </Button>
                      </InlineStack>
                  )}
                </InlineStack>
                <Checkbox
                    label="Select All"
                    checked={allSelected}
                    onChange={handleSelectAll}
                />
              </InlineStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card sectioned>
              {todos.map((todo, index) => (
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  removeTodo={removeTodo}
                  handleSelectTodo={handleSelectTodo}
                  editTodo={openEditModal}
                />
              ))}
            </Card>
          </Layout.Section>
        </Layout>
      </Page>

      <TodoModal
        active={isModalActive}
        handleClose={toggleModal}
        addOrEditTodo={saveTodo}
        editText={editIndex !== null ? todos[editIndex].text : ""}
        editStatus={editIndex !== null ? todos[editIndex].status : ""}
      />
    </Frame>
  );
};

export default App;
