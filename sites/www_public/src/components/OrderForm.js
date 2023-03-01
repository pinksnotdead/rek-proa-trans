import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Calendar from "./Calendar";



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid2 from '@mui/material/Unstable_Grid2';

export default function OrderForm({airplanes, setTotalCargoWeightAllowed}) {
    const handleAirplaneChange = (e, k) => {
        const {props} = k;
        setTotalCargoWeightAllowed(airplanes[props.airplaneid].payload);
    }

    return (
        <Grid2 container spacing={3}>
            <Grid2 xs={6}>
                <TextField fullWidth required id="from" name="from" label="From" variant="standard" />
            </Grid2>
            <Grid2 xs={6}>
                <TextField fullWidth required id="to" name="to" label="To" variant="standard" />
            </Grid2>

            <Grid2 xs={6}>
                <FormControl fullWidth required variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="airplane-label">Airplane</InputLabel>
                    <Select
                        labelId="airplane-label"
                        id="airplane"
                        onChange={ (e, key) => handleAirplaneChange(e, key) }
                        label="Airplane"
                        name="airplane"
                        defaultValue={airplanes[0] || ''}
                    >
                        <MenuItem>
                            <em>None</em>
                        </MenuItem>
                        {airplanes.map((option, k) => (
                            <MenuItem key={k} airplaneid={k} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid2>
            <Grid2 xs={6} container justifyContent="space-between">
                <Grid2 xs={6}>
                    <Calendar />
                </Grid2>
                <Grid2 xs={6}>
                    <Button size="large" type="submit" variant="contained">Order transport!</Button>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}