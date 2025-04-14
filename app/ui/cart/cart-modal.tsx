'use client';

import { getCartDetail } from "@/app/lib/api/cart";
import { useTicketStore } from "@/app/lib/store/ticketStore";
import { useEffect, useState } from "react";


export default function CartModal() {
    const isOpen = useTicketStore((state) => state.isCartOpen);
    const toggle = useTicketStore((state) => state.toggleCart);
    const ticketSessionId = useTicketStore((state)=> state.ticketSessionId)
    const totalSeats = useTicketStore((state)=> state.totalSeats)

    const [cartData, setCartData] = useState();

    useEffect(() => {
        if (isOpen && ticketSessionId) {
            const fetchCartDetail = async () => {
                try {
                    const data = await getCartDetail(ticketSessionId)
                    setCartData(data)
                } catch (err) {
                    console.error('Error fetching ...', err)
                }
            }
            fetchCartDetail()
        }
    }, [isOpen, ticketSessionId]);

    if (!isOpen) return null;
    console.log(cartData)
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <h2 className="text-xl font-bold text-blue-800 mb-4">Resumen de tu compra</h2>

                <div className="space-y-2">
                    {totalSeats>0 ? (
                        <>
                            <p><strong>Pasajeros:</strong> {totalSeats}</p>
                            <p><strong>Total:</strong> ${'calculando...'}</p>
                        </>
                    ) : (
                        <p className="text-gray-500">No hay asientos seleccionados.</p>
                    )}
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={toggle}
                    >
                        Cerrar
                    </button>
                    <button
                        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                        onClick={() => {
                            alert('Continuar con la compra');
                        }}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}
