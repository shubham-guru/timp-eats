export type IUserAddress = {
    street: string,
    city: string,
    landmark: string,
    state: string,
    country: string,
    pincode: string
    }
    
    export interface formUserDataInterface {
    full_name: string,
    complete_address: Array<IUserAddress>,
    email: string,
    phone_number: string
    }