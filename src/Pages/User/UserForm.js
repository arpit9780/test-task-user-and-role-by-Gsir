import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { Box, Button, Grid, MenuItem, Paper, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { editUserFromList, userData } from '../../Redux/Slices/UserSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { UserSchema } from '../../Validation/Schema';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';

export const UserForm = () => {
    const paramId = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { roles , users} = useSelector((state) => {
        return {
            roles: state?.RoleReducer?.roleList,
            users: state?.UserReducer?.usersList
        }
    })

    useEffect(() => {
        if (paramId.id !== " ") {
            let current_obj = users[paramId.id]
            formik.setFieldValue("name", current_obj?.name)
            formik.setFieldValue("email", current_obj?.email)
            formik.setFieldValue("rolelabel", current_obj?.rolelabel)
            formik.setFieldValue("username", current_obj?.username)
            formik.setFieldValue("mobile", current_obj?.mobile)
        }
    }, [paramId])
    const formik = useFormik({
        initialValues: { name: '', email: '', password: '', username: '', mobile: '', rolelabel: '' },
        onSubmit: (values) => {
            if (paramId.id !== undefined) {
                let payload = [paramId.id, values]
                dispatch(editUserFromList(payload))
                toast.success('Updated User')
            }
            else {
                dispatch(userData(values))
                toast.success('Created User')
            }
            formik.resetForm()
            navigate("/")
        },
        validationSchema: UserSchema
    });
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
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
                        <h1>User Details</h1>
                    </div>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                type="text"
                                name="name"
                                fullWidth
                                sx={{ m: 1 }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <TextField
                                id="outlined-basic"
                                label="User Name"
                                variant="outlined"
                                type="text"
                                name="username"
                                fullWidth
                                sx={{ m: 1 }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                type="email"
                                name="email"
                                fullWidth
                                sx={{ m: 1 }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                label="Mobile No."
                                variant="outlined"
                                type="number"
                                name="mobile"
                                fullWidth
                                sx={{ m: 1 }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.mobile}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile && formik.errors.mobile}
                            />
                            <TextField
                                id="demo-simple-select"
                                label="Role"
                                sx={{ width: 448, m: 1 }}
                                select
                                fullWidth
                                labelId="demo-simple-select-label"
                                value={formik.values.rolelabel}
                                name="rolelabel"
                                onChange={formik.handleChange}
                                error={formik.touched.rolelabel && Boolean(formik.errors.rolelabel)}
                                helperText={formik.touched.rolelabel && formik.errors.rolelabel}
                            >
                                {roles?.map((item, i) =>
                                    <MenuItem key={i} value={item?.roleLabel}>{item?.roleLabel}</MenuItem>
                                )}
                            </TextField>

                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                type="password"
                                name="password"
                                fullWidth
                                sx={{ m: 1 }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="success" disabled={formik.isSubmitting} >
                        Submit
                    </Button>
                </form>
            </Box>

        </div>

    )
}
