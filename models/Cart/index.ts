export interface RealtimeCartData {
  id: string;
  activo: boolean;
  uid?: string;
  direccion_entrega: {nombre: string; latitud: number; longitud: number};
  ubicacion_motorista: {latitud: number; longitud: number};
  detalle: {
    sku: string;
    img: string[];
    nombre: string;
    cantidad: number;
    precio: string;
  }[];
  motorista?: {
    nombre: string;
    telefono: string;
    foto: string[];
  };
  status: string;
  estado: [
    {terminado: boolean; hora: String; etapa: 'Orden Recibida'},
    {terminado: boolean; hora: String; etapa: 'En Camino'},
    {terminado: boolean; hora: String; etapa: 'Entregado'},
  ];
}

export interface CartProduct {
  count: number;
  sku: string;
}

export interface CartAddress {
  lat: number;
  long: number;
  name: string;
}

export enum CART_STATE {
  pending = 'pending',
  on_way = 'on_way',
  canceled = 'canceled',
  delivered = 'delivered',
}

export interface Cart {
  carrito: CartProduct[];
  payMethod: string;
  state: CART_STATE;
  promoCode: string;
  address: CartAddress;
  uid: string;
  cartId: string;
}
