import React, {useState, useEffect}  from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import {read, listRelated} from './api-book.js'
import {Link} from 'react-router-dom'
import Suggestions from './Suggestions.jsx'
import AddToCart from '../cart/AddToCart.jsx'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex:{
    display:'flex'
  },
  card: {
    padding:'24px 40px 40px'
  },
  subheading: {
    margin: '24px',
    color: theme.palette.openTitle
  },
  price: {
    padding: '16px',
    margin: '16px 0px',
    display: 'flex',
    backgroundColor: '#93c5ae3d',
    fontSize: '1.3em',
    color: '#375a53',
  },
  media: {
    height: 200,
    display: 'inline-block',
    width: '50%',
    marginLeft: '24px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  link:{
    color: '#3e4c54b3',
    fontSize: '0.9em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    borderRadius: '0.25em',
    backgroundColor: '#5f7c8b'
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  }
}))

export default function book ({match}) {
  const classes = useStyles()
  const [book, setbook] = useState({shop:{}})
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      read({bookId: match.params.bookId}, signal).then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setbook(data)
        }
      })
    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.bookId])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

        listRelated({
          bookId: match.params.bookId}, signal).then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setSuggestions(data)
          }
        })
  return function cleanup(){
    abortController.abort()
  }
}, [match.params.bookId])

    const imageUrl = book._id
          ? `/api/book/image/${book._id}?${new Date().getTime()}`
          : '/api/book/defaultphoto'
    return (
        <div className={classes.root}>
          <Grid container spacing={10}>
            <Grid item xs={7} sm={7}>
              <Card className={classes.card}>
                <CardHeader
                  title={book.name}
                  subheader={book.quantity > 0? 'In Stock': 'Out of Stock'}
                  action={
                    <span className={classes.action}>
                      <AddToCart cartStyle={classes.addCart} item={book}/>
                    </span>
                  }
                />
                <div className={classes.flex}>
                  <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title={book.name}
                  />
                  <Typography component="p" variant="subtitle1" className={classes.subheading}>
                    {book.description}<br/>
                    <span className={classes.price}>$ {book.price}</span>
                    <Link to={'/shops/'+book.shop._id} className={classes.link}>
                      <span>
                        <Icon className={classes.icon}>shopping_basket</Icon> {book.shop.name}
                      </span>
                    </Link>
                  </Typography>

                </div>
              </Card>
            </Grid>
            {suggestions.length > 0 &&
              (<Grid item xs={5} sm={5}>
                <Suggestions  books={suggestions} title='Related books'/>
              </Grid>)}
          </Grid>
        </div>)
}
