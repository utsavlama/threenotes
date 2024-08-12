import React from 'react';
import { TextField } from '@mui/material';

type CharacterSearchProps = {
    inputValue: string;
    onInputChange: (newInputValue: string) => void;
};

const CharacterSearch: React.FC<CharacterSearchProps> = ({ inputValue, onInputChange }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(event.target.value);
    };

    return (
        <TextField
            label="Search Characters"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            fullWidth
            sx={searchStyle}
        />
    );
};

const searchStyle = {
    mb: 2, // Add margin-bottom with spacing unit 2 (typically 16px, depending on your theme)
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(216, 52, 95, 0.5)', // Border color with 50% opacity of #d8345f
        },
        '&:hover fieldset': {
            borderColor: 'rgba(216, 52, 95, 0.75)', // Darker on hover
        },
        '&.Mui-focused fieldset': {
            borderColor: '#d8345f', // Solid #d8345f color when focused
        },
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(216, 52, 95, 0.5)', // Label color with 50% opacity of #d8345f
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#d8345f', // Label color when focused
    },
    '& .MuiOutlinedInput-input': {
        color: '#d8345f', // Text color
    },
}

export default CharacterSearch;
