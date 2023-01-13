import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";

const Fashion = (props) => {
  const [fashion, setFashion] = useState([]);
  const [newFashion, setNewFashion] = useState({
    name: "",
    image: "",
    description: "",
  });
  const BASE_URL = "https://trending-backend.herokuapp.com/fashion";
  const getFashion = async () => {
    try {
      const response = await fetch(BASE_URL);
      const allFashion = await response.json();
      setFashion(allFashion);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const userInput = { ...newFashion };
    userInput[e.target.name] = e.target.value;
    setNewFashion(userInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentState = { ...newFashion };
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      };
      const response = await fetch(BASE_URL, requestOptions);
      const createdTrendf = await response.json();
      setFashion([...fashion, createdTrendf]);
      setNewFashion({
        name: "",
        image: "",
        description: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loaded = () => {
    return (
      <>
        <section className="trendw-list">
          {fashion?.map((trendf) => {
            return (
              <div className="card" key={trendf._id}>
                <h1>{trendf.name}</h1>
                <img src={trendf.image} alt={trendf.name} width={550} />
                <h3>{trendf.description}</h3>
                <Link key={trendf._id} to={`/fashion/${trendf._id}`}>
                  Edit
                </Link>
              </div>
            );
          })}
        </section>
      </>
    );
  };

  const loading = () => (
    <section className="fashion-list">
      <h1>
        Loading...
        <span>
          <img
            className="spinner"
            src="https://freesvg.org/img/1544764567.png"
          />{" "}
        </span>
      </h1>
    </section>
  );

  useEffect(() => {
    getFashion();
  }, []);
  return (
    <section className="new-list">
      <h2>New Fashion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter a fashion trend name"
              value={newFashion.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="image">
            Image
            <input
              type="text"
              id="image"
              name="image"
              placeholder="enter a fashion trend image"
              value={newFashion.image}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              name="description"
              placeholder="enter the fashions description"
              value={newFashion.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <input type="submit" value="Create a new Word" />
      </form>
      {fashion && fashion.length ? loaded() : loading()}
    </section>
  );
};

export default Fashion;
