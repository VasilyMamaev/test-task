import { format } from 'date-fns';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

import { RootState, useAppDispatch } from '../../store';
import docsSlice from '../../store/slices/docsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto',
    height: 400,
  },
  card: {
    margin: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    background: theme.palette.grey[100],
  },
  success: {
    background: theme.palette.success.main,
  },
  signedParticipant: {
    color: theme.palette.success.main,
  },
  emptyMessage: {
    margin: `${theme.spacing(5)}px auto`,
  },
  loadButton: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const ITEMS_PER_STEP = 20;

const DocsList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const docs = useSelector((state: RootState) => state.docs.documents);
  const isSortBySign = useSelector((state: RootState) => state.docs.isSortBySign);
  const searchValue = useSelector((state: RootState) => state.docs.searchValue);
  const selectValue = useSelector((state: RootState) => state.docs.selectValue);
  const [windowHeight, setWindowHeight] = useState<number>();
  const [itemsAtPage, setItemsAtPage] = useState(ITEMS_PER_STEP);
  const [displayedDocs, setDisplayedDocs] = useState(docs.slice(0, itemsAtPage));
  const [hasNotDisplayedDocs, setNotDisplayedDocs] = useState(false);

  // Calculating height of list
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight - 100);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filtering docs
  useEffect(() => {
    if (isSortBySign || searchValue || selectValue) {
      const newArr = [];
      for (let i = 0; newArr.length <= itemsAtPage && docs.length > i; i++) {
        let isIgnored = 0;
        if (isSortBySign) {
          if (!(isSortBySign && docs[i]?.signedDate)) isIgnored += 1;
        }
        if (searchValue) {
          if (!(searchValue && docs[i]?.title.includes(searchValue))) isIgnored += 1;
        }
        if (selectValue) {
          if (!(selectValue && docs[i]?.participants.some((item) => item.id === selectValue))) isIgnored += 1;
        }

        if (!isIgnored) newArr.push(docs[i]);
      }
      if (newArr.length > itemsAtPage) {
        setNotDisplayedDocs(true);
        newArr.pop();
      } else {
        setNotDisplayedDocs(false);
      }
      setDisplayedDocs(newArr);
    } else {
      setDisplayedDocs(docs.slice(0, itemsAtPage));
      if (displayedDocs.length < docs.length) {
        setNotDisplayedDocs(true);
      } else {
        setNotDisplayedDocs(false);
      }
    }
  }, [itemsAtPage, docs, isSortBySign, searchValue, selectValue]);

  const loadMoreHandler = () => {
    setItemsAtPage((prev) => prev + ITEMS_PER_STEP);
  };

  const signHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(docsSlice.actions.signDoc({ id: evt.currentTarget.id }));
  };

  return (
    <div className={classes.root} style={{ height: windowHeight }}>
      {displayedDocs.map((doc) => {
        return (
          <Card key={doc.id} className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={doc.signedDate ? classes.success : undefined}>
                  {doc.signedDate ? <DoneOutlineIcon /> : <HourglassEmptyIcon />}
                </Avatar>
              }
              title={doc.title}
              subheader={doc.signedDate ? format(doc.signedDate, 'dd-MM-yyyy') : ' '}
              action={
                <IconButton aria-label="sign" title="sign" id={doc.id} onClick={signHandler} disabled={doc.signedDate !== null}>
                  <CreateIcon />
                </IconButton>
              }
            />
            <CardContent>
              {doc.participants?.map((participant) => (
                <Typography
                  key={participant.id}
                  className={participant.signedDate ? classes.signedParticipant : undefined}
                >{`${participant.firstname} ${participant.lastname}`}</Typography>
              ))}
            </CardContent>
          </Card>
        );
      })}
      <div className={classes.loadButton}>
        {hasNotDisplayedDocs && (
          <Button startIcon={<VerticalAlignBottomIcon />} onClick={loadMoreHandler}>
            Load more...
          </Button>
        )}
        {!displayedDocs.length && (
          <div className={classes.emptyMessage}>
            <Typography color="textSecondary" variant="overline">
              Empty
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocsList;
