import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import DisplayErrors from "./DisplayError";
import GenericList from "./GenericListComponen";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";
import customConfirm from "./customConfirm";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [entities, setEntities] = useState<T[]>([]);
  const [totalAmountOfPages, setTotalAmountOfPages] = useState<number>(0);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, [page, recordsPerPage]);

  function loadData(): void {
    axios
      .get(props.url, { params: { page, recordsPerPage } })
      .then((res: AxiosResponse<T[]>) => {
        //console.log(res.data);
        const totalAmountOfRecords = parseInt(
          res.headers["totalamountofrecords"],
          10
        );
        //console.log(res.headers);
        setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
        setEntities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const DeleteEntity = async (id: number) => {
    axios
      .delete(`${props.url}/${id}`)
      .then((res: AxiosResponse) => {
        console.log(res);
        loadData();
      })
      .catch((err) => {
        console.log(err);
        if (err && err.response) {
          setErrors(err.response.data);
        }
      });
  };

  const buttons = (editUrl: string, id: number) => {
    return (
      <>
        <Link className="btn btn-dark" to={editUrl}>
          Edit
        </Link>
        <Button
          className="btn btn-warning"
          onClick={() => customConfirm(() => DeleteEntity(id))}
        >
          Delete
        </Button>
      </>
    );
  };

  return (
    <>
      <h3>{props.title}</h3>
      <Link className="btn btn-success " to={props.createURL}>
        Create {props.entityName}
      </Link>
      <RecordsPerPageSelect
        setPage={setPage}
        setRecordsPerPage={setRecordsPerPage}
      />
      {errors ? <DisplayErrors errors={errors} /> : null}
      <Pagination
        totalAmountOfPages={totalAmountOfPages}
        currentPage={page}
        onChange={(newPage) => setPage(newPage)}
      />
      <GenericList list={entities}>
        <table className="table table-border table-hover">
          {props.children(entities!, buttons)}
        </table>
      </GenericList>
    </>
  );
}

interface indexEntityProps<T> {
  url: string;
  title: string;
  createURL: string;
  entityName: string;
  children(
    entities: T[],
    buttons: (editUrl: string, id: number) => React.ReactElement
  ): React.ReactElement;
}
