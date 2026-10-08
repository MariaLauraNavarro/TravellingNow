import express from "express";
import cors from "cors";
import { routerReservas } from './reservas.js';
import { conexion } from './db.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/reservas', routerReservas);
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API de TravellingNow funcionando");
});


app.get("/destinos", async (req, res) => {
  try {
    const [filas] = await conexion.query('SELECT * FROM destinos');
    res.json(filas);
  } catch (error) {
    console.error('Error al obtener destinos:', error);
    res.status(500).json({
      mensaje: 'No se pudieron obtener los destinos'
    });
  }
});
app.get("/destinos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [filas] = await conexion.query(
      'SELECT * FROM destinos WHERE id = ?',
      [id]
    );

    if (filas.length === 0) {
      return res.status(404).json({
        mensaje: 'Destino no encontrado'
      });
    }

    res.json(filas[0]);

  } catch (error) {
    console.error('Error al obtener destino:', error);

    res.status(500).json({
      mensaje: 'No se pudo obtener el destino'
    });
  }
});
app.post("/destinos", async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      imagen,
      cupos = 10
    } = req.body;

    const [resultado] = await conexion.query(
      `INSERT INTO destinos
      (nombre, descripcion, precio, imagen, cupos)
      VALUES (?, ?, ?, ?, ?)`,
      [nombre, descripcion, precio, imagen, cupos]
    );

    const nuevoDestino = {
      id: resultado.insertId,
      nombre,
      descripcion,
      precio,
      imagen,
      cupos
    };

    res.status(201).json(nuevoDestino);

  } catch (error) {
    console.error('Error al agregar destino:', error);

    res.status(500).json({
      mensaje: 'No se pudo agregar el destino'
    });
  }
});
app.put("/destinos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [filas] = await conexion.query(
      'SELECT * FROM destinos WHERE id = ?',
      [id]
    );

    if (filas.length === 0) {
      return res.status(404).json({
        mensaje: 'Destino no encontrado'
      });
    }

    const destinoActual = filas[0];

    const destinoActualizado = {
      nombre: req.body.nombre ?? destinoActual.nombre,
      descripcion: req.body.descripcion ?? destinoActual.descripcion,
      precio: req.body.precio ?? destinoActual.precio,
      imagen: req.body.imagen ?? destinoActual.imagen,
      cupos: req.body.cupos ?? destinoActual.cupos
    };

    await conexion.query(
      `UPDATE destinos
       SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, cupos = ?
       WHERE id = ?`,
      [
        destinoActualizado.nombre,
        destinoActualizado.descripcion,
        destinoActualizado.precio,
        destinoActualizado.imagen,
        destinoActualizado.cupos,
        id
      ]
    );

    res.json({
      id,
      ...destinoActualizado
    });

  } catch (error) {
    console.error('Error al editar destino:', error);

    res.status(500).json({
      mensaje: 'No se pudo editar el destino'
    });
  }
});

app.delete("/destinos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [filas] = await conexion.query(
      'SELECT * FROM destinos WHERE id = ?',
      [id]
    );

    if (filas.length === 0) {
      return res.status(404).json({
        mensaje: 'Destino no encontrado'
      });
    }

    const destinoEliminado = filas[0];

    await conexion.query(
      'DELETE FROM destinos WHERE id = ?',
      [id]
    );

    res.json(destinoEliminado);

  } catch (error) {
    console.error('Error al eliminar destino:', error);

    res.status(500).json({
      mensaje: 'No se pudo eliminar el destino'
    });
  }
});
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

export default app;


