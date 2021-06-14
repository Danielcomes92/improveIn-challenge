import React, { useEffect, useState } from 'react'

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Card = ({ band }) => {
    const { name, country, genreCode, members, year, id } = band
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        handleAlbums()
    }, [])

    const handleAlbums = async () => {
        const response = await axios.get(`https://my-json-server.typicode.com/improvein/dev-challenge/albums?bandId=${id}`)
        setAlbums(response.data)
    }

    const classes = useStyles();
    const [open, setOpen] = useState(false);
  
    const handleModal = () => {
      setOpen(!open);
    };

    return (
        <div className="cardItemContainer">
            <div className="topCardContainer">
                <span className="genre">{genreCode.toUpperCase()}</span>
                
                <div className="midContainer">
                    <span className="nameBand">{name}</span>
                    <span>{country}</span>
                    <span>{members.length} members</span>
                    <span>{year}</span>
                </div>
                
                <div>
                    <span className="btnAlbums" onClick={handleModal}>Albums</span>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">{name}</h2>
                            { 
                                albums.length > 0
                                ? albums.map((album, index) => {
                                    return <p key={index}>{album.name} - {album.year}</p>
                                })
                                : "Sorry, this band doesn't have any album available"
                            }
                            
                        </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
        </div>
        
    )
}
export default Card;