import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

import { RootState, useAppDispatch } from '../../store';
import docsSlice from '../../store/slices/docsSlice';
import useDebounce from '../../tools/useDebounce';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  formControl: {
    minWidth: 200,
  },
  buttonBlock: {
    height: 40,
  },
}));

const ToolsBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isSortBySign = useSelector((state: RootState) => state.docs.isSortBySign);
  const selectValue = useSelector((state: RootState) => state.docs.selectValue);
  const participants = useSelector((state: RootState) => state.docs.participants);
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 600);

  useEffect(() => {
    dispatch(docsSlice.actions.setSerchValue(searchTerm));
  }, [debouncedValue]);

  const searchHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputSearchValue(evt.target.value);
    setSearchTerm(evt.target.value);
  };

  const selectHandler = (evt: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(docsSlice.actions.setSelectValue(evt.target.value as string));
  };

  const clearHandler = () => {
    setInputSearchValue('');
    dispatch(docsSlice.actions.setSerchValue(''));
  };

  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.buttonBlock} variant="contained">
        <Button disabled={!isSortBySign} onClick={() => dispatch(docsSlice.actions.setSortBySign(false))}>
          All
        </Button>
        <Button disabled={isSortBySign} onClick={() => dispatch(docsSlice.actions.setSortBySign(true))}>
          By me
        </Button>
      </ButtonGroup>
      <FormControl>
        <InputLabel htmlFor="search-input">Search</InputLabel>
        <Input
          id="search-input"
          value={inputSearchValue}
          onChange={searchHandler}
          endAdornment={
            inputSearchValue && (
              <InputAdornment position="end">
                <IconButton aria-label="clear search" size="small" onClick={clearHandler}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Signed</InputLabel>
        <Select labelId="select-label" value={selectValue} onChange={selectHandler}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {participants.map((participant) => (
            <MenuItem value={participant.id} key={participant.id}>{`${participant.firstname} ${participant.lastname}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ToolsBar;
