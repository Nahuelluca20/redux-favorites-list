import Dialog from "@mui/material/Dialog";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";

import {SubjectManager} from "@/models";

interface Props {
  children: React.ReactNode;
}

export const dialogOpenSubject$ = new SubjectManager<boolean>();
export const dialogCloseSubject$ = new SubjectManager<boolean>();

export const CustomDialog = ({children}: Props) => {
  const [open, setOpen] = useState(false);
  let openSubject$ = new Subscription();
  let closeSubject$ = new Subscription();

  useEffect(() => {
    openSubject$ = dialogOpenSubject$.getSubject.subscribe(() => handleClickOpen());
    closeSubject$ = dialogCloseSubject$.getSubject.subscribe(() => handleClose());

    return () => {
      openSubject$.unsubscribe();
      closeSubject$.unsubscribe();
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    dialogCloseSubject$.setSubject = false;
  };

  return (
    <div>
      <Dialog
        fullWidth
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        open={open}
        onClose={() => handleExit()}
      >
        {children}
      </Dialog>
    </div>
  );
};

export default CustomDialog;
