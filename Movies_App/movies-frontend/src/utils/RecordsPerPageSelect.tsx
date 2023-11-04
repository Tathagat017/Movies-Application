const RecordsPerPageSelect = (props: recordsPerPageSelectProps) => {
  const select_options = [1, 2, 3, 4, 5, 10, 15, 20, 25];
  const style = { width: "150px" };
  return (
    <div className="mb-3" style={style}>
      <label></label>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          props.setPage(1);
          props.setRecordsPerPage(parseInt(e.target.value, 10));
        }}
        className="form-select"
        defaultValue={5}
      >
        {select_options?.map((el, id) => (
          <option value={+el} key={id}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RecordsPerPageSelect;

interface recordsPerPageSelectProps {
  setPage(page: number): void;
  setRecordsPerPage(recordsPerPage: number): void;
  //setPage:: React.Dispatch<React.SetStateAction<number>>
  //setRecordsPerPage: React.Dispatch<React.SetStateAction<number>>
}
