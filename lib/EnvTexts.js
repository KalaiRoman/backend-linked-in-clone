
import dotenv from 'dotenv';
dotenv.config();
const envFile={
Port:process.env.PORT,
frontEnduser:"",
runningTest:"",
mongo_url:process.env.MONGO_URL
}

export default envFile