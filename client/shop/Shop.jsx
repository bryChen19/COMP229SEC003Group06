/*export default function Shop({match}) { 
const [shop, setShop] = useState('') 
const [error, setError] = useState('')
useEffect(() => {
const abortController = new AbortController() 
const signal = abortController.signal
read({
shopId: match.params.shopId 
}, signal).then((data) => {
if (data.error) { 
setError(data.error)} else { 
setShop(data)
} 
})
return function cleanup(){ 
abortController.abort()
}
}, [match.params.shopId])
... 
}
<CardContent>
<Typography type="headline" component="h2"> 
{shop.name}
</Typography><br/>
<Avatar src={logoUrl}/><br/>
<Typography type="subheading" component="h2"> 
{shop.description}
</Typography><br/> 
</CardContent>
const logoUrl = shop._id
? `/api/shops/logo/${shop._id}?${new Date().getTime()}` 
: '/api/shops/defaultphoto'*/

import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import {read} from './api-shop.js'
import Books from './../book/Books'
import {listByShop} from './../book/api-book.js'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  bookTitle: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%',
    fontSize: '1.2em'
  }
}))

export default function Shop({match}) {
  const classes = useStyles()
  const [shop, setShop] = useState('')
  const [books, setBooks] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listByShop({
      shopId: match.params.shopId
    }, signal).then((data)=>{
      if (data.error) {
        setError(data.error)
      } else {
        setBooks(data)
      }
    })
    read({
      shopId: match.params.shopId
    }, signal).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setShop(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.shopId])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listByShop({
      shopId: match.params.shopId
    }, signal).then((data)=>{
      if (data.error) {
        setError(data.error)
      } else {
        setBooks(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.shopId])

    const logoUrl = shop._id
          ? `/api/shops/logo/${shop._id}?${new Date().getTime()}`
          : '/api/shops/defaultphoto'
    return (<div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={4} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography type="headline" component="h2" className={classes.title}>
                {shop.name}
              </Typography>
              <br/>
              <Avatar src={logoUrl} className={classes.bigAvatar}/><br/>
                <Typography type="subheading" component="h2" className={classes.subheading}>
                  {shop.description}
                </Typography><br/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card>
            <Typography type="title" component="h2" className={classes.bookTitle}>Books</Typography>
            <Books books={books} searched={false}/>
          </Card>
        </Grid>
      </Grid>
    </div>)
}
