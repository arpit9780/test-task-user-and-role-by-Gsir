import { Box, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { roleSchema } from '../../Validation/Schema';
import { EditRoleFromList, roleData } from "../../Redux/Slices/RoleSlice"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const RolesForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const paramId = useParams()
  
  const {roles} = useSelector((state) => {
   return{
     roles: state?.RoleReducer?.roleList
   }
  })

  useEffect(() => {
    if (paramId.id !== undefined) {
      let current_obj = roles[paramId.id]
      formik.setFieldValue("roleLabel", current_obj?.roleLabel)
      formik.setFieldValue("roleKey", current_obj?.roleKey)
    }
  }, [paramId])
  const formik = useFormik({
    initialValues: { roleLabel: '', roleKey: '' },
    onSubmit: values => {
      if (paramId.id !== undefined) {
        let payload = [paramId.id, values]
        toast.success('Role Updated')
        dispatch(EditRoleFromList(payload))
      }
      else {
        toast.success('New Role Created')
        dispatch(roleData(values))
      }

      navigate("/role/list")
      formik.resetForm()
    },
    validationSchema: roleSchema,
  });
  return (<>
    <div className='form-style'>
      <Box sx={{
        mx: 'auto', 
        width: "auto", m: 2, p: 1, 
        borderRadius: '16px',
        backgroundColor: '#F0FFFF',
      }
      } >
        <form onSubmit={formik.handleSubmit} autocomplete="off">
          <div className='heading'>
            <h1>Role Details</h1>
          </div>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <TextField label="Role Label"
                fullWidth
                sx={{ m: 1 }}
                type="text"
                name="roleLabel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.roleLabel}
                error={formik.touched.roleLabel && Boolean(formik.errors.roleLabel)}
                helperText={formik.touched.roleLabel && formik.errors.roleLabel}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Role Key"
                fullWidth
                sx={{ m: 1 }}
                type="text"
                name="roleKey"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.roleKey}
                error={formik.touched.roleKey && Boolean(formik.errors.roleKey)}
                helperText={formik.touched.roleKey && formik.errors.roleKey}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="success" disabled={formik.isSubmitting} >
            Submit
          </Button>
        </form>
      </Box>
    </div>
  </>
  )
}
