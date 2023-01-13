import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function BookShow(props) {
  const [trendb, setTrendb] = useState(null);
  const [editForm, setEditForm] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const URL = `https://trending-backend.herokuapp.com/book/${id}`;

  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const updateTrendb = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      };
      const response = await fetch(URL, options);
      const updatedTrendb = await response.json();

      setTrendb(updatedTrendb);
      setEditForm(updatedTrendb);
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };

  const getTrendb = async () => {
    try {
      const response = await fetch(URL);
      const foundTrendb = await response.json();
      setTrendb(foundTrendb);
      setEditForm(foundTrendb);
    } catch (err) {
      console.log(err);
    }
  };

  const removeTrendb = async () => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(URL, options);
      const deletedTrendb = await response.json();
      navigate("/book");
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };
  useEffect(() => {
    getTrendb();
  }, []);

  const loaded = () => (
    <>
      <section>
        <div className="book">
          <h1>Book Show Page</h1>
          <img src={trendb.image} alt={trendb.name + " image"} />
          <h2>{trendb.name}</h2>
          <h3>{trendb.author}</h3>
          <h3>{trendb.description}</h3>
          <div>
            <button className="delete" onClick={removeTrendb}>
              Remove book
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2>Edit this Book Trend</h2>
        <form onSubmit={updateTrendb}>
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.author}
            name="author"
            placeholder="author"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.description}
            name="description"
            placeholder="description"
            onChange={handleChange}
          />
          <input type="submit" value="Update Book" />
        </form>
      </section>
    </>
  );
  const loading = () => (
    <>
      <h1>Loading...</h1>
    </>
  );
  return <div>{trendb ? loaded() : loading()}</div>;
}

export default BookShow;
