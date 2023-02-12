import {useEffect} from "react";
import {Checkbox} from "@mui/material";
import {DataGrid, GridRenderCellParams} from "@mui/x-data-grid";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {AppStore} from "@/redux/store";
import {addFavorite} from "@/redux/states";
import {Person} from "@/models";
export interface PeopleTableInterface {}

const PeopleTable: React.FC<PeopleTableInterface> = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const pageSize = 5;
  const dispatch = useDispatch();
  const statePeople = useSelector((store: AppStore) => store.people);
  const favoritePeople = useSelector((store: AppStore) => store.favorites);

  const findPerson = (person: Person) => !!favoritePeople.find((p) => p.id === person.id);
  const filterPerson = (person: Person) => favoritePeople.filter((p) => p.id !== person.id);

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person];

    dispatch(addFavorite(filteredPeople));

    setSelectedPeople(filteredPeople);
  };

  useEffect(() => {
    setSelectedPeople(favoritePeople);
  }, [favoritePeople]);

  const columns = [
    {
      field: "actions",
      type: "actions",
      sortable: false,
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <Checkbox
              checked={findPerson(params.row)}
              size="small"
              onChange={() => handleChange(params.row)}
            />
          }
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "category",
      headerName: "Categories",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "levelOfHappiness",
      headerName: "Level Of Happiness",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];

  return (
    <DataGrid
      autoHeight
      disableColumnSelector
      disableSelectionOnClick
      columns={columns}
      getRowId={(row: any) => row.id}
      pageSize={pageSize}
      rows={statePeople}
      rowsPerPageOptions={[pageSize]}
    />
  );
};

export default PeopleTable;
