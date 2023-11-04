import Loading from "./Loading";
import React from "react";
export default function GenericList(props: genericListProps) {
  if (!props.list) {
    if (props.loadingUI) {
      return props.loadingUI;
    } else {
      return <Loading />;
    }
  } else if (props.list.length == 0) {
    if (props.emptyListUI) {
      return props.emptyListUI;
    } else {
      return <div>No Data to show</div>;
    }
  } else {
    return props.children;
  }
}

interface genericListProps {
  list: any;
  loadingUI?: React.ReactElement;
  emptyListUI?: React.ReactElement;
  children?: React.ReactElement;
}
