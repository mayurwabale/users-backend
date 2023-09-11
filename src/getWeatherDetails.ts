import axios from 'axios';
import mongoose from "mongoose"

async function getWeatherDetails() {
    try {
       await connectDB();
       //8ebc160ec1004255d7de4e867902c2af
        const city = "Surat";
        const apiKey = "8ebc160ec1004255d7de4e867902c2af"
        const weatherDetails = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
        if(weatherDetails.status === 200 && !weatherDetails.data.error){
            console.log(200);
            if(weatherDetails.data.location && weatherDetails.data.current){
                const savedWeatherDetails = await weather.create({location:weatherDetails.data.location,currentWeather:weatherDetails.data.current});
                console.log(`Current weather details of city : ${city} fetched and saved successfuly`)
            }
            else{
                throw new Error(`location & current is required`);
            }  
        }
        if(weatherDetails.data.error){
            console.log(weatherDetails.data.error);
            throw new Error(`Error get while calling Weather details API Error:${weatherDetails.data.error}`);
        }
    } catch (error) {
        throw Error(`Method:getWeatherDetails Error:${error}`)
    }
}

 async function connectDB() {
    try {
        const connect = await mongoose.connect('mongo url');
        console.log("connection succesful", connect.connection.name);
        return
    } catch (error) {
        console.log(error);
        throw new Error("Error during Database connection");
    }
}

const weatherDetailsSchema = new mongoose.Schema({
    location:{
        type:Object,
        required:[true,"Location is Mandatory"]
    },
    currentWeather:{
        type:Object,
        required:[true,"currentWeather is Mandatory"]
    }
})
const weather = mongoose.model("Weather",weatherDetailsSchema);
getWeatherDetails();

