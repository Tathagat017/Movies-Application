import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../actors/actorsmodel";
import { URLactors } from "../Endpoints";
import axios, { AxiosResponse } from "axios";

const TypeAheadActors = (props: TypeAheadActorsProps) => {
  const [selectedActor, setSelectedActor] = useState<actorMovieDTO[]>([]);
  const [inputValue, setInputValue] = useState<string>(""); // Initialize with an empty string
  const [actors, setActors] = useState<actorMovieDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Use the inputValue in the URL to fetch actors
    if (inputValue) {
      setIsLoading(true); // Set loading to true while fetching data
      axios
        .get(`${URLactors}/searchByName/${inputValue}`)
        .then((res: AxiosResponse<actorMovieDTO[]>) => {
          setActors(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setActors([]);
    }
  }, [inputValue]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleActorSelect = (actors: actorMovieDTO[]) => {
    if (actors.length > 0) {
      const selected = actors[0];
      if (!props.actors.find((actor) => actor.id === selected.id)) {
        actors[0].character = "";
        props.onAdd([...props.actors, selected]);
      }
      setInputValue("");
    }
  };

  const handleRemove = (actor: actorMovieDTO) => {
    const updatedActors = props.actors.filter((a) => a.id !== actor.id);
    props.onRemove(updatedActors);
  };

  return (
    <div className="mb-3">
      <label htmlFor="typeahead">{props.displayName}</label>
      <Typeahead
        id="typeahead"
        onChange={handleActorSelect}
        onInputChange={handleInputChange}
        options={actors}
        labelKey="name"
        filterBy={() => true}
        placeholder="Write the name of the actor here..."
        minLength={1}
        selected={selectedActor}
        isLoading={isLoading}
        renderMenuItemChildren={(actor) => (
          <div key={actor.id}>
            <img
              src={actor.picture}
              style={{ width: "32px", height: "32px", marginRight: "10px" }}
              alt={actor.name}
            />
            <span>
              {actor.name} - acted as - {actor.character}
            </span>
          </div>
        )}
        flip={true}
      />
      <ul className="list-group">
        {props.actors?.map((actor, ind) => (
          <li
            key={ind}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {props.listUI(actor)}
            <span
              className="badge badge-primary badge-pill text-dark"
              onClick={() => handleRemove(actor)}
              style={{ cursor: "pointer" }}
            >
              ✖️
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeAheadActors;

interface TypeAheadActorsProps {
  displayName: string;
  actors: actorMovieDTO[];
  onAdd(actors: actorMovieDTO[]): void;
  listUI(actor: actorMovieDTO): React.ReactElement;
  onRemove(actors: actorMovieDTO[]): void;
}
