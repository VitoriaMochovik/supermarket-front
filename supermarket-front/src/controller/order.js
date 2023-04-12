import axios from 'axios'

export async function createOrder(data) {


    await axios.post('http://ec2-44-201-181-250.compute-1.amazonaws.com:3001/order', data)

    
}