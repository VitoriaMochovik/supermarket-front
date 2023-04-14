import axios from 'axios'

export async function getAllProducts() {


    // const result =  await axios.get('http://ec2-44-201-181-250.compute-1.amazonaws.com:3001/product')

    const result =  await axios.get('http://localhost:3001/product')
    
    return result.data

}