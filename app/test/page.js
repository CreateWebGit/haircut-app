"use client";
import Dropdown from "@/components/Dropdown";
import "../globals.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

const Page = () => {
  const [productTitle, setProductTitle] = useState("Ny product");
  const [productForm, setProductForm] = useState([]);
  const [isDraging, setDraging] = useState(false);

  useEffect(() => {
    let _productForm = [...productForm];
    _productForm.push({
      categoryName: "",
      id: "",
      products: [
        {
          productName: "Produkt 1",
          productPrice: "",
          id: "1",
        },
        {
          productName: "Produkt 2",
          productPrice: "",
          id: "2",
        },
        {
          productName: "Produkt 3",
          productPrice: "",
          id: "3",
        },
      ],
    });
    setProductForm(_productForm);
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    console.log(result);
    const newTaskIds = Array.from(productForm);
    console.log(newTaskIds[0].products);
    // const myTast = newTaskIds[0].products[source.index];
    console.log(newTaskIds[source.index]);
    const [myTast] = newTaskIds[0].products.splice(source.index, 1);
    console.log(newTaskIds);
    newTaskIds[0].products.splice(destination.index, 0, myTast);
    console.log(newTaskIds);

    setProductForm(newTaskIds);
    console.log(productForm);
  };

  const handleAddProductSection = () => {
    let _productForm = [...productForm];
    _productForm.push({
      categoryName: "",
      id: "",
      products: [
        {
          productName: "Ny tjänst",
          productPrice: "",
          id: uuidv4(),
        },
      ],
    });
    setProductForm(_productForm);
  };

  const handleAddProduct = (id, i) => {
    console.log(i);
    const index = productForm.findIndex((product) => product.id === id);
    let _productForm = [...productForm];
    _productForm[index].products.splice(i + 1, 0, {
      productName: "Ny tjänst",
      productPrice: "",
      id: uuidv4(),
    });

    setProductForm(_productForm);
  };

  const handleProductChange = (catId, prodId, event) => {
    const catIndex = productForm.findIndex((product) => product.id === catId);
    let _productForm = [...productForm];
    const prodIndex = productForm[catIndex].products.findIndex(
      (product) => product.id === prodId
    );
    _productForm[catIndex].products[prodIndex][event.target.name] =
      event.target.value;

    setProductForm(_productForm);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(productForm);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center w-full">
        <div className="border w-[800px] px-8 py-4">
          <form onSubmit={submit} className="form">
            {productForm.map((category, index) => {
              return (
                <div key={index} className="">
                  <div className="mb-2">
                    <div className="styledInput !w-[690px]">
                      <input
                        className="input"
                        type="text"
                        name="user_name"
                        placeholder=" "
                        required
                      />
                      <label className="label">Kategori</label>
                      <div className="line"></div>
                    </div>
                  </div>
                  <Droppable droppableId="haha">
                    {(provided, snapshot) => {
                      return (
                        <div
                          key={index}
                          className={
                            snapshot.isDraggingOver
                              ? "bg-orange-300 px-8"
                              : "bg-white px-8"
                          }
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {category.products.map((product, index) => {
                            return (
                              <Draggable
                                draggableId={product.id}
                                index={index}
                                key={product.id}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      className={`flex ${
                                        snapshot.isDragging
                                          ? "bg-blue-200 mt-2"
                                          : "bg-white m-2"
                                      }`}
                                    >
                                      <Dropdown
                                        title={product.productName}
                                        id={product.id}
                                        index={index}
                                        className=""
                                      >
                                        <div className="px-8">
                                          <div className="styledInput !w-[400px] !my-8 ">
                                            <input
                                              className="pr-8"
                                              type="text"
                                              name="user_name"
                                              placeholder=" "
                                              onChange={(e) =>
                                                handleProductChange(
                                                  category.id,
                                                  product.id,
                                                  e
                                                )
                                              }
                                              required
                                            />
                                            <label className="label">
                                              Tjänst
                                            </label>
                                            <div className="line"></div>
                                          </div>

                                          <div className="flex gap-24 mb-8">
                                            <div>
                                              <div className="styledInput">
                                                <input
                                                  className="input"
                                                  type="text"
                                                  name="user_name"
                                                  placeholder=" "
                                                  onChange={(e) =>
                                                    handleProductChange(
                                                      category.id,
                                                      product.id,
                                                      e
                                                    )
                                                  }
                                                  required
                                                />
                                                <label className="label">
                                                  Tid
                                                </label>
                                                <div className="line"></div>
                                              </div>
                                            </div>
                                            <div>
                                              <div className="styledInput">
                                                <input
                                                  className="input"
                                                  type="text"
                                                  name="user_name"
                                                  placeholder=" "
                                                  onChange={(e) =>
                                                    handleProductChange(
                                                      category.id,
                                                      product.id,
                                                      e
                                                    )
                                                  }
                                                  required
                                                />
                                                <label className="label">
                                                  Pris
                                                </label>
                                                <div className="line"></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Dropdown>
                                      <CiSquareMinus color="red" size={40} />
                                      <CiSquarePlus
                                        color="green"
                                        size={40}
                                        onClick={() =>
                                          handleAddProduct(category.id, index)
                                        }
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                  <button onClick={() => handleAddProduct(category.id)}>
                    +
                  </button>
                </div>
              );
            })}
          </form>
          <button onClick={handleAddProductSection}>Add More..</button>
          <br />
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Page;
