import "./MultipleSelector.css";

const MultipleSelector = (props: multipleSelectorProps) => {
  const selectItems = (item: multipleSelectorModel) => {
    const selected = [...props.selected, item];
    const nonSelected = props.nonSelected.filter((el) => el !== item);
    props.onChange(selected, nonSelected);
  };

  const deSelectItems = (item: multipleSelectorModel) => {
    const nonSelected = [...props.nonSelected, item];
    const selected = props.selected.filter((el) => el !== item);
    props.onChange(selected, nonSelected);
  };

  const selectAll = () => {
    const selected = [...props.nonSelected, ...props.selected];
    const nonSelected: multipleSelectorModel[] = [];
    props.onChange(selected, nonSelected);
  };

  const deSelectAll = () => {
    const nonSelected = [...props.nonSelected, ...props.selected];
    const selected: multipleSelectorModel[] = [];
    props.onChange(selected, nonSelected);
  };

  return (
    <div className="mb-3">
      <label>{props.displayName}</label>
      <div className="multiple-selector">
        <ul>
          {props.nonSelected?.map((el) => (
            <li
              key={el.key}
              onClick={() => {
                selectItems(el);
              }}
            >
              {el.value}
            </li>
          ))}
        </ul>
        <div className="multiple-selector-buttons">
          <button type="button" onClick={() => selectAll()}>
            {">>"}
          </button>
          <button type="button" onClick={() => deSelectAll()}>
            {"<<"}
          </button>
        </div>
        <ul>
          {props.selected?.map((el) => (
            <li
              key={el.key}
              onClick={() => {
                deSelectItems(el);
              }}
              className="mutilple-selector-li"
            >
              {el.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultipleSelector;

interface multipleSelectorProps {
  displayName: string;
  selected: multipleSelectorModel[];
  nonSelected: multipleSelectorModel[];
  onChange(
    selected: multipleSelectorModel[],
    nonSelected: multipleSelectorModel[]
  ): void;
}

export interface multipleSelectorModel {
  key: number;
  value: string;
}
