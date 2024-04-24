"use client";
import Dropdown from "@/components/Dropdown";
import "../globals.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

  const handleAddProduct = (id) => {
    const index = productForm.findIndex((product) => product.id === id);
    let _productForm = [...productForm];
    _productForm[index].products.push({
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
                <div key={index}>
                  <div className="">
                    <div class="group">
                      <input required="true" class="main-input" type="text" />
                      <span class="highlight-span"></span>
                      <label class="lebal-email">email</label>
                    </div>
                  </div>
                  <Droppable droppableId="haha">
                    {(provided, snapshot) => {
                      return (
                        <div
                          key={index}
                          className={
                            snapshot.isDraggingOver
                              ? "bg-orange-300 pl-8"
                              : "bg-white pl-8"
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
                                      className={
                                        snapshot.isDragging
                                          ? "bg-blue-200"
                                          : "bg-white"
                                      }
                                    >
                                      <Dropdown
                                        title={product.productName}
                                        id={product.id}
                                        index={index}
                                      >
                                        <label className="myLabel">
                                          Namn på tjänst
                                        </label>
                                        <input
                                          name="productName"
                                          placeholder=""
                                          className="myInput"
                                          onChange={(e) =>
                                            handleProductChange(
                                              category.id,
                                              product.id,
                                              e
                                            )
                                          }
                                        />
                                        <div className="flex">
                                          <div>
                                            <label className="myLabel">
                                              Tid
                                            </label>
                                            <input
                                              name="productTime"
                                              placeholder=""
                                              className="myInput"
                                              onChange={(e) =>
                                                handleProductChange(
                                                  category.id,
                                                  product.id,
                                                  e
                                                )
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label className="myLabel">
                                              Pris
                                            </label>
                                            <input
                                              name="productPrice"
                                              placeholder=""
                                              className="myInput"
                                              onChange={(e) =>
                                                handleProductChange(
                                                  category.id,
                                                  product.id,
                                                  e
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                      </Dropdown>
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
      <form class="form">
        <p>login</p>
        <div class="group">
          <input required="true" class="main-input" type="text" />
          <span class="highlight-span"></span>
          <label class="lebal-email">email</label>
        </div>
        <div class="container-1">
          <div class="group">
            <input required="true" class="main-input" type="text" />
            <span class="highlight-span"></span>
            <label class="lebal-email">password</label>
          </div>
        </div>
        <button class="submit">submit</button>
      </form>
      <form className="form">
        <div className="styledInput">
          <input
            className="input"
            type="text"
            name="user_name"
            placeholder=" "
            required
          />
          <label className="label">Namn</label>
          <div className="line"></div>
        </div>
        <div className="styledInput">
          <input
            className="input"
            type="text"
            name="user_phone"
            placeholder=" "
            required
          />
          <label className="label">Telefon</label>
          <div className="line"></div>
        </div>
        <div className="styledInput">
          <input
            className="input"
            type="email"
            name="user_email"
            placeholder=" "
            required
          />
          <label className="label">E-post</label>
          <div className="line"></div>
        </div>
        <div className="styledInput">
          <textarea className="textarea" name="message" required />
          <label className="label">Meddelande</label>
          <div className="line"></div>
        </div>
        <div className="submitContainer">
          <input type="submit" value="Skicka" />
        </div>
      </form>
    </DragDropContext>
  );
};

export default Page;
