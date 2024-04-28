import axiosInstance from './axios/interceptor'


export async function sendData(userName: string) {
    try {
        const response = await axiosInstance.post('/api/send', {data: userName});
        console.log('Post Response: ', response.data)
    } catch (error) {
        console.log('An error occurred: ', error)
        //handle error from back end
        
    }
}
