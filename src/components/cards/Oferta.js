import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'block',
    position: 'relative',
    width: 345,
    minHeight: 200,
    margin: 'auto'
  },
  media: {
    height: 345,
  },
  button: {
    fontSize: 16,
  },
});

export default function MediaCard({nome, descricao, imagem, url, preco}) {
  const classes = useStyles();
  const img = imagem ? imagem : 'https://www.biotecdermo.com.br/wp-content/uploads/2016/10/sem-imagem-10.jpg';

  function verdemarException(url) {
    return 'https://www.verdemaratevoce.com.br' + url
  }
  const link = descricao.toLowerCase() === 'verdemar' ? verdemarException(url) : url;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title={nome}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {descricao}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" className={classes.button}>
          {preco}
        </Button>
        <a href={link} target="_blank" rel="noreferrer">
        <Button size="small" color="primary" className={classes.button}>
          Ir para a loja
        </Button>
        </a>
      </CardActions>
    </Card>
  );
}