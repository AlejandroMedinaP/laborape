import { Button, Box, Grid, Typography, Card, CardActions, CardContent, CardMedia } from '@mui/material';

const PropuestaCard = ({ id, nombre, descripcion, image }) => {

    return (
        <Card key={id} sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 200 }}
                image={image}
                title="propuestaImage"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {descripcion}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Más detalles</Button>
            </CardActions>
        </Card>
    )
}

export default PropuestaCard;