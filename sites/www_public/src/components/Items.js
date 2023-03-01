import React from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Grid2 from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const { useState , useEffect } = React;

const types = [
    {
        value: 'normal',
        label: 'Normal',
    },
    {
        value: 'dangerous',
        label: 'Dangerous',
    }
];


let removeImg = {cursor:'pointer', position: 'absolute', top: '-20px', right: '-20px'};
const Item = ({id, index, removeItem, currentCargoWeight, setCurrentCargoWeight}) => {

    const weightValidation = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        e.target.value = val;
    }

    return(
        <Box
            component="div"
            noValidate
            sx={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                gridTemplateColumns: { sm: '1fr' },
                gap: 1,
                sm: 12,
                maxWidth: 250,
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
                mr: 3,
                mb: 2,
                border: 1,
                borderColor: 'grey.500',
                borderRadius: '16px',
                position: 'relative'

            }}
        >
            <div style={removeImg}>
                <Fab color="primary" size="small" aria-label="remove" onClick={() => removeItem(index)}>
                    <DeleteIcon />
                </Fab>
            </div>
                <TextField
                    id={`item-name-${id}`}
                    name={`item[${id}]name`}
                    label="Name"
                    size="small"
                    variant="outlined"
                    required
                    InputProps={{
                        sx: {width: 228}
                    }}
                />
                <TextField
                id={`item-weight-${id}`}
                name={`item[${id}]weight`}
                label="Weight"
                size="small"
                variant="outlined"
                required
                pattern="[0-9]*"
                onChange={weightValidation}
                InputProps={{
                    inputMode: 'numeric',
                    startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    sx: {width: 100}
                }}
                />
                <FormControl sx={{ m: 0, minWidth: 120 }} size="small" required>
                    <InputLabel id={`label-item-type-${id}`}>Type</InputLabel>
                    <Select
                        labelId={`label-item-type-${id}`}
                        name={`item[${id}]type`}
                        id={`item-type-${id}`}
                        label="Type"
                    >
                        <MenuItem value="">
                            <em>Choice</em>
                        </MenuItem>
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            {/*</div>*/}
        </Box>
    )
}

let contentId = 0;
const Items = ({currentCargoWeight, setCurrentCargoWeight}) => {

    const [content, setContent] = useState([]);

    useEffect(() => {});

    const addContent = event => {
        contentId++;
        setContent(content => [...content , contentId]);
    }

    function removeContent (index) {
        let clone = [...content]
        clone.splice(index, 1)
        setContent(clone);
        setCurrentCargoWeight(13);
    }

    return(
        <Grid2
            sx={{
                p: 1,
                border: 1,
                borderStyle: 'dashed',
                borderColor: 'grey.500',
                borderRadius: '5px',
            }}
        >
                {
                    content.map((id,i) =>
                            <Item
                                key={id}
                                id={id}
                                index={i}
                                removeItem={removeContent}
                                currentCargoWeight={currentCargoWeight}
                                setCurrentCargoWeight={setCurrentCargoWeight}
                            />
                    )
                }
            <div onClick={(event) => addContent(event)} style={{display: 'inline-flex'}}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        </Grid2>
    )
}

export default Items;

