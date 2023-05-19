import React from 'react'
import TextField from '@mui/material/TextField'

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

function Search({ setSearch }: SearchProps) {
  return (
    <TextField
      size='small'
      color='secondary'
      id='outlined-search'
      label='Search field'
      type='search'
      focused
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}

export default Search
