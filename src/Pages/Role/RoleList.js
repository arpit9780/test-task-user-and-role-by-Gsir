import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteRoleFromList } from '../../Redux/Slices/RoleSlice'
import { toast } from 'react-toastify';

export const RoleList = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [roleDataArr, setRoleDataArr] = useState([])
  const { data } = useSelector((state) => {
    return { data: state?.RoleReducer?.roleList }
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setRoleDataArr(data)
  }, [data, roleDataArr])

  const goToAdd = () => {
    navigate("/role/form")
  }

  const editRole = (i) => {
    navigate(`/role/form/${i}`)
  }
  const handleOpen = (i) => {
    setId(i)
    setOpen(true);
  }

  const handleConfirmDelete = () => {
    toast.success("Deleted Role")
    dispatch(deleteRoleFromList(id))
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (<>
    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
      <Grid item xs={6} textAlign="left">
        <Typography variant='h5'><strong>Role Details</strong></Typography>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <Button variant="contained" sx={{ m: 2, mx: 'auto', width: 200 }} onClick={goToAdd}><AddIcon /></Button>
      </Grid>
    </Grid>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Role Label</TableCell>
            <TableCell align="left">Role Key</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roleDataArr.length > 0 ? roleDataArr?.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.roleLabel}</TableCell>
              <TableCell align="left">{row.roleKey}</TableCell>
              <TableCell align="left">
                <Button variant="outlined" onClick={() => editRole(i)}><EditIcon /></Button>
                <Button variant="outlined" onClick={() => handleOpen(i)}><DeleteIcon /></Button>
              </TableCell>

            </TableRow>
          ))
            :
            <TableRow >
              <TableCell colSpan={7} style={{ textAlign: "center" }}>
                Data Not Found
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Role Delete ?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are You Sure Delete This Role
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={() => handleConfirmDelete()} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </>
  )
}
