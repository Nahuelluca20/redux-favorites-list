import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {CustomDialog} from "../CustomDialog";
import {dialogOpenSubject$} from "../CustomDialog/CustomDialog";

import {FavoriteTable} from "./FavoriteTable";

export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  const handleClick = () => {
    dialogOpenSubject$.setSubject = true;
  };

  return (
    <>
      <CustomDialog>
        <FavoriteTable />
      </CustomDialog>
      <AppBar position="fixed">
        <Toolbar>
          <Typography component="div" sx={{flexGrow: 1}} variant="h6">
            Redux Favorites List
          </Typography>
          <IconButton
            aria-label="favorites"
            color="secondary"
            component="label"
            onClick={handleClick}
          >
            <FavoriteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
