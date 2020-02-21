import React, {useContext} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import { PropTypes } from 'prop-types';
import Button from "@material-ui/core/Button";
import {TodoContext} from "../contexts/TodoContext";

function DeleteDialog(props) {
    const hide = () =>
    {
      props.setDeletable(false);
    };

    const context = useContext(TodoContext);
    return (
        <Dialog onClose={hide} fullWidth={true} maxWidth={"sm"} open={props.open}>
            <DialogTitle>Voulez-vous vraiment supprimer cette ligne ?</DialogTitle>
            <DialogContent>
                {props.todo.name}
            </DialogContent>
            <DialogActions>
                <Button onClick={hide}>Annuler</Button>
                <Button onClick={() => {
                    context.deleteTodo({id: props.todo.id, name: props.todo.name});
                    hide();
                }}>Supprimer</Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeletable: PropTypes.func.isRequired,
    todo: PropTypes.shape = ({
        id: PropTypes.number,
        name: PropTypes.string
    })
};
export default DeleteDialog;