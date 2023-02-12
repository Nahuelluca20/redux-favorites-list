import {IconButton} from "@mui/material";
import {GridRenderCellParams, DataGrid} from "@mui/x-data-grid";
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

import {AppStore} from "@/redux/store";
import {revomeFavorite} from "@/redux/states";
import {Person} from "@/models";
export interface FavoriteTableInterface {}

const FavoriteTable: React.FC<FavoriteTableInterface> = () => {
  const pageSize = 5;
  const dispatch = useDispatch();
  const stateFavorites = useSelector((store: AppStore) => store.favorites);

  const handleClick = (person: Person) => {
    dispatch(revomeFavorite(person));
  };

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
            <IconButton
              aria-label="favorites"
              color="secondary"
              component="label"
              onClick={() => handleClick(params.row)}
            >
              <DeleteIcon />
            </IconButton>
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
      rows={stateFavorites}
      rowsPerPageOptions={[pageSize]}
    />
  );
};

export default FavoriteTable;
