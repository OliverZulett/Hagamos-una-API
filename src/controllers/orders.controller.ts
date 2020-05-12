import { Request, Response } from "express";
import Order from "../models/order.model";
import User from "../models/user.model";
import { statusResponse } from "../functions/statusResponse.function";

const ordersController = {
  async orderList(req: Request, res: Response) {
    await Order.find({}, "order_date total_price")
      .sort('order_date')
      .populate("user", "nick image")
      .populate("products.product", "name image")
      .exec( async (err, products) => {
      if (err) return statusResponse(res, 500, "error al buscar pedidos", err);
      await Order.countDocuments((err, total) => {
        if (err)
          return statusResponse(res, 500, "error al contar pedidos", err);
        statusResponse(res, 200, "lista de pedidos", null, {
          pedidos: products,
          total_pedidos: total,
        });
      });
    });
  },

  async getOrderById(req: Request, res: Response) {
    const id = req.params.id;

    await Order.findById(id)
      .populate("user", "nick image")
      .populate("products.product", "name image")
      .exec((err, order: any) => {

        if (err || order === null) return statusResponse(res, 500, "error al buscar pedido", err);

        if (!order || Object.keys(order).length === 0)
          return statusResponse(res, 404, "no se encontro el pedido", err);

        statusResponse(res, 200, "pedidos", null, { pedido: order });
      });
  },

  async createOrder(req: Request, res: Response) {
    const user_id = req.params.user_id;
    const orderReceived = req.body;

    if (!orderReceived || Object.keys(orderReceived).length < 4)
      return statusResponse(res, 400, "parametros incompletos", {
        err: "parametros incompletos",
      });

    await User.findById(user_id, async (err, user: any) => {
      if (err || user === null) return statusResponse(res, 500, "error al buscar usuario", err);

      if (Object.keys(user).length === 0)
        return statusResponse(res, 404, "no se encontro el usuario", err);

      orderReceived.user = user_id;
      const order = new Order(orderReceived);

      await order.save((err, newOrder) => {
        if (err || newOrder === null)
          return statusResponse(res, 500, "error al guardar pedido", err);
        statusResponse(res, 200, "pedido creado", null, { pedido: newOrder });
      });
    });
  },

  async updateOrder(req: Request, res: Response) {
    const id = req.params.id;
    const orderReceived = req.body;

    if (!orderReceived || Object.keys(orderReceived).length === 0) {
      return statusResponse(res, 400, "Nada que actualizar", {
        err: "Nada que actualizar",
      });
    }

    await Order.findById(id, async (err, orderForUpdate: any) => {
      if (err || orderForUpdate === null)
        return statusResponse(res, 500, "error al encontrar pedido", err);

      const newOrder = { ...orderForUpdate._doc, ...orderReceived };

      await Order.findByIdAndUpdate(id, newOrder, (err, orderUpdated) => {
        if (err || orderUpdated === null)
          return statusResponse(res, 500, "error al actualizar pedido", err);
        statusResponse(res, 200, "pedido actualizado", null, {
          old_product: orderUpdated,
          new_product: newOrder,
        });
      });
    });
  },

  async deleteOrder(req: Request, res: Response) {
    const id = req.params.id;
    await Order.findByIdAndDelete(id, async (err, orderDeleted: any) => {
      if (err || orderDeleted === null) return statusResponse(res, 500, "error al eliminar pedido", err);

      statusResponse(res, 200, "pedido eliminado", null, {
        pedido: orderDeleted,
      });
    });
  },
};

export default ordersController;
