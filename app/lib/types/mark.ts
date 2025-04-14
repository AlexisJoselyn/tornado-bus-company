export interface Ticket {
    id: number;
    code: string;
}

export interface BusSeat {
    seatNumber: string;
    isAvailable: boolean;
}

export interface TotalDetail {
    subtotal: number;
    tax: number;
    total: number;
}

export interface MarkSeatResponse {
    statusCode: number;
    data: {
        ticket: Ticket;
        busSketch: BusSeat[];
        ticketSessionId: number;
        totalDetail: TotalDetail;
        expirationDate: string;
        expirationTime: number;
    };
    meta: object;
    success: object[];
    fail: object[];
    log: object;
}

export interface MarkSeatPayload {
    tickeTypeID: number;
    ticketSessionId: number | null;
    cityInitID: number;
    cityEndID: number;
    itineraryID: number;
    busPlaceID: number[];
    tempTicketId: null;
    ticketRef: null;
    idMulti: null;
    isReturn: boolean;
    currencyID: number;
    mDestiny: null;
    mOrigin: null;
    mRow: null;
    timeZone: string;
    externalInitID: null;
    externalEndID: null;
}