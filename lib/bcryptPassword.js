import bcrypt from 'bcrypt';

const passwordGenerate=async(password)=>{
    try {
        
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hashSync(salt,password);
        return hashedPassword;
    } catch (error) {
        return "Password Bcrypt Error";
    }
}

export default passwordGenerate;