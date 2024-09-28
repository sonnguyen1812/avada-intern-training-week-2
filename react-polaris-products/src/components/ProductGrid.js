import React, { useEffect, useState } from "react";
import {
  Page,
  LegacyCard,
  DataTable,
  Select,
  Card,
  InlineStack,
  TextField,
  Button,
  Modal,
  ActionList,
  Popover,
  Checkbox,
  Pagination,
} from "@shopify/polaris";
import { EditIcon, PlusIcon, SearchIcon, SortIcon } from "@shopify/polaris-icons";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("ascending");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [showSearchField, setShowSearchField] = useState(false); // Hiển thị form search
  const [popoverActive, setPopoverActive] = useState(false); // Hiển thị ActionList cho Sort

  const rows = [];

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const sortProducts = (data) => {
    return data.sort((a, b) => {
      const aValue = sortBy === "id" ? a.id : a.name.toLowerCase();
      const bValue = sortBy === "id" ? b.id : b.name.toLowerCase();

      if (sortBy === "name") {
        return sortDirection === "descending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
      } else {
        return sortDirection === "ascending"
            ? aValue - bValue
            : bValue - aValue;
      }
    });
  };

  const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = sortProducts(filteredProducts);

  sortedProducts.forEach((product) => {
    const { id, name, image, price, createdAt } = product;
    rows.push([
      <div style={{ textAlign: "left" }}>
        <Checkbox
            type="checkbox"
            checked={selectedItems.includes(id)}
            onChange={() => handleSelectItem(id)}
        />
      </div>,
      <div style={{ textAlign: "left" }}>{id}</div>,
      <img
          src={image}
          alt={name}
          style={{ width: "50px", height: "50px" }}
      />,
      name,
      <div style={{ textAlign: "left" }}>${price}</div>,
      new Date(createdAt).toLocaleDateString(),
      <Button
          icon={EditIcon}
          variant={"monochromePlain"}
          onClick={() => handleEditProduct(product)}
      ></Button>,
    ]);
  });

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(parseInt(value));
    setPage(0);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setSortDirection(
        sortDirection === "descending" ? "ascending" : "descending"
    );
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPage(0);
  };

  const handleModalOpen = () => {
    setCurrentProduct({ id: "", name: "", image: "", price: "" });
    setIsEditing(false);
    setModalActive(true);
  };

  const handleModalClose = () => {
    setModalActive(false);
  };

  const handleAddEditProduct = () => {
    if (isEditing) {
      setProducts(
          products.map((product) =>
              product.id === currentProduct.id ? currentProduct : product
          )
      );
    } else {
      const highestId = Math.max(...products.map((product) => product.id), 100);
      const newId = highestId + 1;

      setProducts([
        ...products,
        { ...currentProduct, id: newId, createdAt: new Date() },
      ]);
    }
    handleModalClose();
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setModalActive(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleBulkDelete = () => {
    const confirmed = window.confirm(
        "Are you sure you want to delete the selected products?"
    );
    if (confirmed) {
      setProducts(
          products.filter((product) => !selectedItems.includes(product.id))
      );
      setSelectedItems([]);
      setIsAllSelected(false);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sortedProducts.map((product) => product.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const paginatedRows = rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
  );

  const itemsPerPageOptions = [
    { label: "5 items", value: "5" },
    { label: "10 items", value: "10" },
    { label: "20 items", value: "20" },
  ];

  const toggleSearchField = () => {
    setShowSearchField(!showSearchField);
    if (!showSearchField) {
      setSearchTerm(""); // Clear search term khi ẩn search
    }
  };

  const togglePopoverActive = () => setPopoverActive(!popoverActive);

  const activator = (
      <Button icon={SortIcon} onClick={togglePopoverActive}>
        Sort
      </Button>
  );

  return (
      <Page title="Products">
        <LegacyCard>
          {/* Gom pagination và các chức năng vào cùng một hàng với data table */}
          <div style={{display: "flex", justifyContent: "space-between", padding: "10px", alignItems: "center"}}>
            <InlineStack gap="400">
              <Button
                  variant={"monochromePlain"}
                  icon={PlusIcon}
                  onClick={handleModalOpen}
              ></Button>

              {selectedItems.length > 0 && (
                  <Button
                      variant="primary"
                      tone="critical"
                      onClick={handleBulkDelete}
                  >
                    Delete
                  </Button>
              )}
            </InlineStack>

            <InlineStack blockAlign={"center"} gap="200">
              {showSearchField ? (
                  <InlineStack>
                    <TextField
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Enter product name..."
                        clearButton
                        onClear={() => setSearchTerm("")}
                        connectedRight={
                          <Button onClick={toggleSearchField}>Cancel</Button>
                        }
                    />
                  </InlineStack>
              ) : (
                  <>
                    <Select
                        labelInline
                        label="Rows"
                        options={itemsPerPageOptions}
                        value={String(rowsPerPage)}
                        onChange={handleRowsPerPageChange}
                    />
                    <Button
                        icon={SearchIcon}
                        onClick={toggleSearchField}
                        accessibilityLabel="Search"
                    />
                    <Popover
                        active={popoverActive}
                        activator={activator}
                        onClose={togglePopoverActive}
                    >
                      <ActionList
                          items={[
                            {
                              content: "Sort by ID",
                              onAction: () => handleSortChange("id"),
                            },
                            {
                              content: "Sort by Name",
                              onAction: () => handleSortChange("name"),
                            },
                          ]}
                      />
                    </Popover>
                  </>
              )}
            </InlineStack>

          </div>

          <DataTable
              verticalAlign={"middle"}
              columnContentTypes={[
                "text",
                "text",
                "text",
                "text",
                "text",
                "text",
                "text",
              ]}
              headings={[
                <Checkbox
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                />,
                "ID",
                "Image",
                "Name",
                "Price",
                "Created At",
                "Actions",
              ]}
              rows={paginatedRows}
          />
          <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBlock: "10px",
              }}
          >
            <Pagination
                label={`${page + 1} of ${Math.ceil(rows.length / rowsPerPage)}`}
                hasPrevious={page > 0}
                onPrevious={() => handlePagination(page - 1)}
                hasNext={(page + 1) * rowsPerPage < rows.length}
                onNext={() => handlePagination(page + 1)}
            />
          </div>
        </LegacyCard>

        {/* Modal */}
        <Modal
            title={isEditing ? "Edit Product" : "Add Product"}
            open={modalActive}
            onClose={handleModalClose}
            primaryAction={{
              content: isEditing ? "Save Changes" : "Add Product",
              onAction: handleAddEditProduct,
            }}
            secondaryActions={[
              {
                content: "Cancel",
                onAction: handleModalClose,
              },
            ]}
        >
          <Modal.Section>
            <TextField
                label="Product Name"
                value={currentProduct.name}
                onChange={(value) =>
                    setCurrentProduct({ ...currentProduct, name: value })
                }
            />
            <TextField
                label="Product Image URL"
                value={currentProduct.image}
                onChange={(value) =>
                    setCurrentProduct({ ...currentProduct, image: value })
                }
            />
            <TextField
                label="Product Price"
                value={currentProduct.price}
                onChange={(value) =>
                    setCurrentProduct({ ...currentProduct, price: value })
                }
            />
          </Modal.Section>
        </Modal>
      </Page>
  );
};

export default ProductGrid;
