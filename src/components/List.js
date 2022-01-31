import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../helpers/Url";
// import getJediByName from "../selectors/getJediByName";
import querystring from "query-string";
import useForm from "../hooks/useForm";
import "./List.scss"

const List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = querystring.parse(location.search);
  console.log(location.search);

  const [values, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = values;

  const [data, setData] = useState([]);

  const getData = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    setData(data.results);
    return data;
  };

  const getJediByName = (name) => {
    name = name.toLocaleLowerCase();
    return data.filter((movie) =>
      movie.name.toLocaleLowerCase().includes(name)
    );
  };

  const JediFiltro = getJediByName(searchText);

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
    navigate(`?q=${searchText}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="Form">
        <input className="Input"
          type={"text"}
          placeholder="Find your Jedi"
          name="searchText"
          autoComplete="off"
          value={searchText}
          onChange={handleInputChange}
        />
      </form>
      {JediFiltro?.map((Informacion) => (
        <div key={Informacion.id} className="Container">
          <h1 className="Texto">{Informacion.name}</h1>
          <img src={Informacion.image} alt=""  className="Imagen"/>
        </div>
      ))}
    </div>
  );
};

export default List;
