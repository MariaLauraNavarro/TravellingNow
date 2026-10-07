
import { Router } from 'express';
import { authAdmin, dbAdmin } from './firebase-admin.js';
import { FieldValue } from 'firebase-admin/firestore';
export const routerReservas = Router();

async function verificarUsuario(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        mensaje: 'Debés iniciar sesión'
      });
    }

    const usuario = await authAdmin.verifyIdToken(token);

    req.usuario = usuario;
    next();

  } catch (error) {
    return res.status(401).json({
      mensaje: 'Sesión inválida'
    });
  }
}

routerReservas.post('/', verificarUsuario, async (req, res) => {
  try {
    const {
      idSolicitud,
      destinoId,
      nombreApellido,
      cantidadPasajeros,
      fechaDesde,
      fechaHasta
    } = req.body;

    if (
  typeof idSolicitud !== 'string' ||
  !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idSolicitud)
) {
  return res.status(400).json({
    mensaje: 'Identificador de solicitud inválido'
  });
  }

    if (
      typeof destinoId !== 'string' ||
      !destinoId.trim() ||
      typeof nombreApellido !== 'string' ||
      !nombreApellido.trim() ||
      !Number.isInteger(cantidadPasajeros) ||
      cantidadPasajeros < 1 ||
      typeof fechaDesde !== 'string' ||
      typeof fechaHasta !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(fechaDesde) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(fechaHasta) ||
      !Number.isFinite(Date.parse(fechaDesde)) ||
      !Number.isFinite(Date.parse(fechaHasta)) ||
      fechaHasta < fechaDesde
    ) {
      return res.status(400).json({
        mensaje: 'Datos de reserva inválidos'
      });
    }

    const destinoRef = dbAdmin.collection('destinos').doc(destinoId);
    const reservaRef = dbAdmin.collection('reservas').doc(idSolicitud);

    await dbAdmin.runTransaction(async (transaccion) => {
      const documento = await transaccion.get(destinoRef);
      
const reservaExistente = await transaccion.get(reservaRef);

if (reservaExistente.exists) {
  const datos = reservaExistente.data();

  if (
    datos.usuarioId !== req.usuario.uid ||
    datos.destinoId !== destinoId ||
    datos.nombreApellido !== nombreApellido.trim() ||
    datos.cantidadPasajeros !== cantidadPasajeros ||
    datos.fechaDesde !== fechaDesde ||
    datos.fechaHasta !== fechaHasta
  ) {
    throw new Error('SOLICITUD_DUPLICADA_INVALIDA');
  }

  return;
}


      if (!documento.exists) {
        throw new Error('DESTINO_NO_EXISTE');
      }

      const destino = documento.data();

      if (!Number.isInteger(destino.cupos)) {
        throw new Error('CUPOS_NO_CONFIGURADOS');
      }

      if (destino.cupos < cantidadPasajeros) {
        throw new Error('CUPOS_INSUFICIENTES');
      }

      if (
        typeof destino.precio !== 'number' ||
        !Number.isFinite(destino.precio) ||
        destino.precio < 0
      ) {
        throw new Error('PRECIO_INVALIDO');
      }

      transaccion.update(destinoRef, {
        cupos: destino.cupos - cantidadPasajeros
      });

      transaccion.create(reservaRef, {
        destinoId,
        destinoNombre: destino.nombre,
        precio: destino.precio,
        total: destino.precio * cantidadPasajeros,
        nombreApellido: nombreApellido.trim(),
        email: req.usuario.email ?? '',
        cantidadPasajeros,
        fechaDesde,
        fechaHasta,
        usuarioId: req.usuario.uid,
        fechaReserva: FieldValue.serverTimestamp()
      });
    });

    res.status(201).json({
      mensaje: 'Reserva realizada correctamente',
      reservaId: reservaRef.id
    });

  } catch (error) {
    if (
      ['DESTINO_NO_EXISTE', 'CUPOS_NO_CONFIGURADOS',
        'CUPOS_INSUFICIENTES', 'PRECIO_INVALIDO',
        'SOLICITUD_DUPLICADA_INVALIDA']
        .includes(error.message)
    ) {
      return res.status(400).json({
        mensaje: error.message
      });
    }

    console.error('Error al reservar:', error);
    res.status(500).json({
      mensaje: 'No se pudo realizar la reserva'
    });
  }
});
